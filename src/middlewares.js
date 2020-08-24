const jwt = require("jsonwebtoken");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

//auth token
function authentication(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const user = {
    username: "asep",
  };

  if (token == null) return res.json({ message: "you don't have token" });
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, req) => {
    if (err) return res.sendStatus(403);
    next();
  });
}

module.exports = {
  notFound,
  errorHandler,
  authentication,
};
