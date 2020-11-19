const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const globalsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    default: "",
    maxlength: 420,
  },
  description: {
    type: String,
    default: "",
    maxlength: 420,
  },
  city: {
    type: String,
    default: "",
    maxlength: 420,
  },
});

const validateGlobals = (globals) => {
  const schema = Joi.object({
    date: Joi.date(),
    title: Joi.string().max(420),
    description: Joi.string().max(420),
    city: Joi.string().max(420),
  });

  return schema.validate(globals);
};

const Globals = mongoose.model("Globals", globalsSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateGlobals;
module.exports = Globals;
