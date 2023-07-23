const jwt = require("jsonwebtoken");
require("dotenv").config();

const AdminverifyJWT = async (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.sendStatus(403);
  }
  const token = auth.slice(7).trim();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_ADMIN, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = { AdminverifyJWT };
