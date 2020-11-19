const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;

const meetingsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  city: {
    type: String,
    default: "",
    maxlength: 420,
  },
  title: {
    type: String,
    default: "",
    maxlength: 420,
  },
  place: {
    type: String,
    default: "",
    maxlength: 420,
  },
  street: {
    type: String,
    default: "",
    maxlength: 420,
  },
  duration: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
    maxlength: 420,
  },
});

const validateMeetings = (meetings) => {
  const schema = Joi.object({
    date: Joi.date(),
    city: Joi.string().max(420),
    street: Joi.string().max(420),
    description: Joi.string().max(420),
    duration: Joi.number().min(0),
  });

  return schema.validate(meetings);
};

const Meetings = mongoose.model("Meetings", meetingsSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateMeetings;
module.exports = Meetings;
