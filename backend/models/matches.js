const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const matchesSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  opponent_name: {
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

const validateMatches = (matches) => {
  const schema = Joi.object({
    date: Joi.date(),
    location: Joi.string().max(420),
    opponent_name: Joi.string().max(420),
  });

  return schema.validate(matches);
};

const Matches = mongoose.model("Matches", matchesSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateMatches;
module.exports = Matches;
