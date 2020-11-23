const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;

const messagesSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: String,
    default: "",
    maxlength: 420,
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
});

const validateMessages = (meetings) => {
  const schema = Joi.object({
    date: Joi.date(),
    owner: Joi.string().max(420),
    description: Joi.string().max(420),
    title: Joi.string().max(420),
  });

  return schema.validate(messages);
};

const Messages = mongoose.model("Messages", messagesSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateMessages;
module.exports = Messages;
