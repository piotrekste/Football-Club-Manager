const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;

const trainingsSchema = new mongoose.Schema({
  start_date: {
    type: Date,
    default: Date.now,
  },
  finish_date: {
    type: Date,
    default: Date.now,
  },
  players_id: {
    type: [ObjectId],
    required: true,
    ref: "Players",
  },
  duration: {
    type: Number,
    default: 0,
  },
});

const validateTrainings = (trainings) => {
  const schema = Joi.object({
    start_date: Joi.date(),
    finish_date: Joi.date(),
    duration: Joi.number().min(0),
    players_id: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(trainings);
};

exports.trainings = trainingsSchema;
exports.validateTrainings = validateTrainings;
