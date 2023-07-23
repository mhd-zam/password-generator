const adminCredential = require("../model/adminModel");
const userCredential = require("../model/usercredentials");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  AdminLog: (credentials) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await adminCredential.findOne(credentials);
            if (!result) {
                const error = new Error("Account does not exsist");
                error.statusCode = 401;
                throw error;
            }
            let accessToken = jwt.sign(
                { result },
                process.env.ACCESS_TOKEN_SECRET_ADMIN,
                { expiresIn: "2d" }
            );

            resolve({akn:accessToken,loggedin:true});
      } catch (err) {
        reject(err);
      }
    });
  },
  getUserList: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await userCredential.aggregate([
          { $match: {} },
          {
            $lookup: {
              from: "credentiallists",
              localField: "_id",
              foreignField: "userid",
              as: "result",
            },
          },
          {
            $addFields: {
              result: { $arrayElemAt: ["$result", 0] },
            },
          },
          {
            $addFields: {
              count: { $size: "$result.userCredentials" },
            },
          },
          {
            $project: {
              email: 1,
              blocked: 1,
              count: 1,
            },
          },
        ]);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },
  manageBlock: (uid) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await userCredential.findOne({ _id: uid });
        await userCredential.updateOne(
          { _id: uid },
          { $set: { blocked: !result.blocked } }
        );
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
};
