const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;
const staffsSchema = new mongoose.Schema({
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
  role: {
    type: String,

    default: "",
    maxlength: 420,
  },
  login: {
    type: String,
    default: "",
    maxlength: 420,
  },
  password: {
    type: String,
    default: "",
    maxlength: 420,
  },
  meeting_id: {
    type: [ObjectId],
    default: [],
    ref: "Meetings",
  },
});

const validateStaffs = (staffs) => {
  const schema = Joi.object({
    first_name: Joi.string().max(420),
    last_name: Joi.string().max(420),
    role: Joi.string().valid("trainer", "physio"), //todo more
    login: Joi.string().max(420),
    password: Joi.string().max(420),
    meeting_id: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(staffs);
};

const Staffs = mongoose.model("Staffs", staffsSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateStaffs;
module.exports = Staffs;
