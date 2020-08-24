const express = require("express");
const router = express.Router();
const monk = require("monk");
const Joi = require("joi");

const db = monk(process.env.MONGGO_URI);
const study = db.get("user");

const Schema = Joi.object({
  nama: Joi.string().required(),
  kelas: Joi.string().required(),
});

// read all
router.get("/", async (req, res, next) => {
  try {
    const items = await study.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// read one
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await study.findOne({
      _id: id,
    });

    if (!item) return next();
    return res.json(item);
  } catch (error) {
    next(error);
  }
});

//create one
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const value = await Schema.validateAsync(req.body);
    const inserted = await study.insert(value);

    res.json(value);
  } catch (error) {
    next(error);
  }
});

//update one
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const value = await Schema.validateAsync(req.body);
    const item = await study.findOne({
      _id: id,
    });

    if (!item) return next();
    await study.update(
      {
        _id: id,
      },
      {
        $set: value,
      }
    );
    res.json(value);
  } catch (error) {
    next(error);
  }
});

//delete one
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await study.remove({ _id: id });
    res.json({
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
