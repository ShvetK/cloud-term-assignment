const jwt = require("jsonwebtoken");
const secretFun = require("../config/config.js");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const fun = async () => {
    try {
      // Verify token
      const sData = await secretFun();
      const jwtS = sData.jwtsecret;
      const decoded = jwt.verify(token, jwtS);
      //Add user from payload
      req.user = decoded;
      next();
    } catch (e) {
      res.status(400).json({ msg: "Token is not valid" });
    }
  };

  fun();
}

module.exports = auth;
