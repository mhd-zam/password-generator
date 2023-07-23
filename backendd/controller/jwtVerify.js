const jwt = require("jsonwebtoken");
require("dotenv").config();
const userCredential = require("../model/usercredentials");

const verifyJWT = async (req, res, next) => {
  const auth = req.headers['authorization']    
  if (!auth) {
    return res.sendStatus(403);
  }
    const token = auth.slice(7).trim()
  
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
      }
    req.decoded = decoded
  });

  let result = await userCredential.findOne({ _id: req.decoded.result._id })
  

  if (result.blocked) {
   return res.sendStatus(403)
  }
  next()
};

module.exports = { verifyJWT };