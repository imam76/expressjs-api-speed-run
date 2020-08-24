const express = require("express");

const emojis = require("./emojis");
const studyeasy = require("./StudyEasy");
const auth = require("./auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/study", studyeasy);
router.use("/auth", auth);

module.exports = router;
