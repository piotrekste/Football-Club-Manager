const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const featuresSchema = new mongoose.Schema({
  height: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  foot: {
    type: String,
    enum: ["", "right", "left", "both"],
    default: "",
  },
});

const validateFeatures = (features) => {
  const schema = Joi.object({
    height: Joi.number().min(0),
    weight: Joi.number().min(0),
    foot: Joi.string().valid("right", "left", "both"),
  });

  return schema.validate(features);
};

exports.features = featuresSchema;
exports.validateFeatures = validateFeatures;
