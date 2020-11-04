const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;

const managersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: "",
    maxlength: 420,
  },
  last_name: {
    type: String,
    default: "",
    maxlength: 420,
  },
  email: {
    type: String,
    default: "",
    maxlength: 420,
  },
  password: {
    type: String,
    default: "",
    maxlength: 420,
  },
  login: {
    type: String,
    default: "",
    maxlength: 420,
  },

  meetings_id: {
    type: [ObjectId],
    required: true,
    ref: "Meetings",
  },
});

const validateManagers = (managers) => {
  const schema = Joi.object({
    first_name: Joi.string().max(420),
    last_name: Joi.string().max(420),
    email: Joi.string().max(420),
    password: Joi.string().max(420),
    login: Joi.string().max(420),

    meetings_id: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(managers);
};

const Managers = mongoose.model("Managers", managersSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateManagers;
module.exports = Managers;
