const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const staffSchema = new mongoose.Schema({
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
    enum: ["", "trainer", "physio"], //todo more
    default: "",
  },
  salary: {
    type: Number,
    default: 0,
  },
});

const validateStaff = (staff) => {
  const schema = Joi.object({
    first_name: Joi.string().max(420),
    last_name: Joi.string().max(420),
    role: Joi.string().valid("trainer", "physio"), //todo more
    height: Joi.number().min(0),
  });

  return schema.validate(staff);
};

exports.staff = staffSchema;
exports.validateStaff = validateStaff;
