const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//auth token
router.post("/", (req, res, next) => {
  const username = req.body.username;
  const user = { name: username };

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({
    token: token,
  });
});

module.exports = router;
