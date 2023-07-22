const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  const auth = req.headers['authorization']    
  if (!auth) {
    return res.sendStatus(401);
  }
    const token = auth.slice(7).trim()

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
      }
      req.decoded=decoded
    next();
  });
};

module.exports = { verifyJWT };