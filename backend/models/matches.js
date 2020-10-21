const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const matchesSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  opponent: {
    flashcards: {
      type: Object,
      default: [],
      ref: "Opponents",
    },
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
    opponent: Joi.array().items(Joi.object()),
  });

  return schema.validate(matches);
};

exports.matches = matchesSchema;
exports.validateMatches = validateMatches;
