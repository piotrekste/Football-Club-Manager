const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const opponentsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    maxlength: 420,
  },
  location: {
    type: String,
    default: "",
    maxlength: 420,
  },
});

const validateOpponents = (opponents) => {
  const schema = Joi.object({
    name: Joi.string().max(420),
    location: Joi.string().max(420),
  });

  return schema.validate(opponents);
};

exports.opponents = opponentsSchema;
exports.validateOpponents = validateOpponents;
