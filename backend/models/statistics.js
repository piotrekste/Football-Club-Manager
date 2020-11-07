const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const statisticsSchema = new mongoose.Schema({
  goals_season: {
    type: Number,
    default: 0,
  },
  goals_all: {
    type: Number,
    default: 0,
  },
  assist_season: {
    type: Number,
    default: 0,
  },
  assist_all: {
    type: Number,
    default: 0,
  },
  matches_season: {
    type: Number,
    default: 0,
  },
  matches_all: {
    type: Number,
    default: 0,
  },
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
    enum: ["", "right", "left"], //todo more
    default: "",
  },
});

const validateStatistics = (statistics) => {
  const schema = Joi.object({
    goals_season: Joi.number().min(0),
    goals_all: Joi.number().min(0),
    assists_season: Joi.number().min(0),
    assists_all: Joi.number().min(0),
    matches_season: Joi.number().min(0),
    matches_all: Joi.number().min(0),
    height: Joi.number().min(0),
    weight: Joi.number().min(0),
    position: Joi.string().valid("right", "left"),
  });

  return schema.validate(statistics);
};

const Statistics = mongoose.model("Statistics", statisticsSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateStatistics;
module.exports = Statistics;
