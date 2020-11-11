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
  street: {
    type: String,
    default: "",
    maxlength: 420,
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
  });

  return schema.validate(meetings);
};

const Meetings = mongoose.model("Meetings", meetingsSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateMeetings;
module.exports = Meetings;
