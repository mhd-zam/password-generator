const bcrypt = require("bcrypt");
const userCredential = require("../model/usercredentials");
const credentialList = require("../model/credentialList");
const sharedlist = require("../model/sharedlist");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const crypto = require("node:crypto");
const algorithm = "aes-256-cbc";
const key = "hq.NDgGb&u5t>;:cLP</C4Z'QWM9j8Ay";
const iv = process.env.IV_SECRET_KEY;
const orginaldata = Buffer.from(iv, "base64");

module.exports = {
  signup: (credentials) => {
    return new Promise(async (resolve, reject) => {
      try {
        credentials.password = await bcrypt.hash(credentials.password, 10);
        let result = await userCredential.findOne({ email: credentials.email });
        if (result) {
          const error = new Error("email already exists");
          error.statusCode = 401;
          throw error;
        }
        let response = await userCredential.create(credentials);
        console.log(response);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  Login: (credentials) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await userCredential.findOne({ email: credentials.email });
        if (!result) {
          const error = new Error("Account does not exsist");
          error.statusCode = 401;
          throw error;
        }
        let check = await bcrypt.compare(credentials.password, result.password);
        if (!check) {
          const error = new Error("Invalid Password");
          error.statusCode = 401;
          throw error;
        }

        let accessToken = jwt.sign(
          { result },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "2d" }
        );

        resolve({ accessToken, logged: true });

        console.log(result);
      } catch (err) {
        reject(err);
      }
    });
  },

  insertdocument: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const cipher = crypto.createCipheriv(algorithm, key, orginaldata);
        let encryptedData = cipher.update(data.password, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        let objid = new mongoose.Types.ObjectId();
        let newList = {
          _id: objid,
          platform: data.platform,
          username: data.username,
          password: encryptedData,
        };

        let result = await credentialList.updateOne(
          { userid: data._id },
          { $push: { userCredentials: newList } },
          { upsert: true }
        );

        resolve(encryptedData);
      } catch (err) {
        reject(err);
      }
    });
  },

  updatedocument: (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
    });
  },

  getList: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await credentialList.findOne({
          userid: data,
        });
        if (!response) {
          response = await credentialList.create({
            userid: data,
            userCredentials: [],
          });
        }
        let { userCredentials } = response;

        userCredentials.forEach((element) => {
          element.password = "";
        });
        userCredentials = userCredentials.reverse();
        resolve(userCredentials);
      } catch (err) {
        reject(err);
      }
    });
  },

  getPassword: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await credentialList.aggregate([
          { $unwind: "$userCredentials" },
          {
            $match: { "userCredentials._id": new mongoose.Types.ObjectId(id) },
          },
          { $project: { userCredentials: 1, _id: 0 } },
        ]);
        const { password } = result[0].userCredentials;
        const decipher = crypto.createDecipheriv(algorithm, key, orginaldata);
        let decryptedData = decipher.update(password, "hex", "utf-8");
        decryptedData += decipher.final("utf-8");

        resolve({ password: decryptedData });
      } catch (err) {
        reject(err);
      }
    });
  },
  deleteFile: (fileid, uid) => {
    return new Promise(async (resolve, reject) => {
      try {
        await credentialList.updateOne(
          { userid: uid },
          { $pull: { userCredentials: { _id: fileid } } }
        );
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
  getEditFile: (fileid, uid) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await credentialList.aggregate([
          { $match: { userid: new mongoose.Types.ObjectId(uid) } },
          { $unwind: "$userCredentials" },
          {
            $match: {
              "userCredentials._id": new mongoose.Types.ObjectId(fileid),
            },
          },
          { $project: { userCredentials: 1, _id: 0 } },
        ]);
        let file = result[0];
        const { password } = file.userCredentials;
        const decipher = crypto.createDecipheriv(algorithm, key, orginaldata);
        let decryptedData = decipher.update(password, "hex", "utf-8");
        decryptedData += decipher.final("utf-8");
        file["userCredentials"]["password"] = decryptedData;
        resolve(file.userCredentials);
      } catch (err) {
        reject(err);
      }
    });
  },

  setEditfile: (fileid, file) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(file.password);

        const cipher = crypto.createCipheriv(algorithm, key, orginaldata);
        let encryptedData = cipher.update(file.password, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        file["password"] = encryptedData;
        await credentialList.updateOne(
          { userid: fileid, "userCredentials._id": file._id },
          { $set: { "userCredentials.$": file } }
        );
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },

  shareFile: (userid, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await userCredential.findOne({
          email: data.senderEmail,
        });

        if (!response) {
          const error = new Error("no user found");
          error.statusCode = 400;
          throw error;
        }

        if (response._id == userid) {
          const error = new Error("not self shareble");
          console.log("keri");
          error.statusCode = 401;
          throw error;
        }

        const futureDate = new Date(new Date());
        futureDate.setDate(futureDate.getDate() + 14); 
        let document = {
          listID: data.fileId,
          validity: futureDate.toISOString().slice(0, 10),
        };

        await sharedlist.updateOne(
          { userid: response._id },
          { $push: { sharedList: document } },
          { upsert: true }
        );
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },

  getSharedFiles: (id) => {
    return new Promise(async (resolve, reject) => {
      let response = await sharedlist.findOne({ userid: id });

      if (!response) {
        response = await sharedlist.create({ userid: id, sharedlist: [] });
      }

      let result = await sharedlist.aggregate([
        { $match: { userid: new mongoose.Types.ObjectId(id) } },
        {
          $unwind: "$sharedList",
        },
        {
          $lookup: {
            from: "credentiallists",
            localField: "sharedList.listID",
            foreignField: "userCredentials._id",
            as: "matchedCredentials",
          },
        },
        {
          $unwind: "$matchedCredentials",
        },
        {
          $addFields: {
            matchedCredentials: {
              $filter: {
                input: "$matchedCredentials.userCredentials",
                as: "credential",
                cond: { $eq: ["$$credential._id", "$sharedList.listID"] },
              },
            },
          },
        },
        { $unwind: "$matchedCredentials" },
        { $group: { _id: "", shareditem: { $push: "$matchedCredentials" } } },
      ]);

      let item=result[0]?result[0]?.shareditem:[]

      resolve(item);
    });
  },
};
