const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;

const trainingsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  place: {
    type: String,
    default: "",
    maxlength: 420,
  },
  duration: {
    type: Number,
    default: 0,
  },
});

const validateTrainings = (trainings) => {
  const schema = Joi.object({
    date: Joi.date(),
    place: Joi.string().max(420),
    duration: Joi.number().min(0),
  });

  return schema.validate(trainings);
};

const Trainings = mongoose.model("Trainings", trainingsSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateTrainings;
module.exports = Trainings;
