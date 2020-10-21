const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const statisticsSchema = new mongoose.Schema({
  season_goals: {
    type: Number,
    default: 0,
  },
  overall_goals: {
    type: Number,
    default: 0,
  },
  season_assists: {
    type: Number,
    default: 0,
  },
  overall_assists: {
    type: Number,
    default: 0,
  },
  matches: {
    type: Number,
    default: 0,
  },
});

const validateStatistics = (statistics) => {
  const schema = Joi.object({
    season_goals: Joi.number().min(0),
    overall_goals: Joi.number().min(0),
    season_assists: Joi.number().min(0),
    overall_assists: Joi.number().min(0),
    matches: Joi.number().min(0),
  });

  return schema.validate(statistics);
};

exports.statistics = statisticsSchema;
exports.validateStatistics = validateStatistics;
