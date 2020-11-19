const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const matchesSchema = new mongoose.Schema({
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

const validateMatches = (matches) => {
  const schema = Joi.object({
    date: Joi.date(),
    title: Joi.string().max(420),
    description: Joi.string().max(420),
    city: Joi.string().max(420),
  });

  return schema.validate(matches);
};

const Matches = mongoose.model("Matches", matchesSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateMatches;
module.exports = Matches;
