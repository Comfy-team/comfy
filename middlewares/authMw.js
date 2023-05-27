const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.secretKey);
    req.decodedObject = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.decodedObject.role === "admin") {
    next();
  } else {
    let error = new Error("not Authorized");
    error.status = 403;
    next(error);
  }
};
