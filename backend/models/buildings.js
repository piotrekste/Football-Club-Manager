const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const buildingsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    maxlength: 420,
  },
});

const validateBuildings = (buildings) => {
  const schema = Joi.object({
    name: Joi.string().max(420),
  });

  return schema.validate(buildings);
};

exports.buildings = buildingsSchema;
exports.validateBuildings = validateBuildings;
