const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const buildingsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    maxlength: 420,
  },
  capacity: {
    type: Number,
    default: 0,
  },
  costs: {
    type: Number,
    default: 0,
  },
});

const validateBuildings = (buildings) => {
  const schema = Joi.object({
    name: Joi.string().max(420),
    capacity: Joi.number().min(0),
    costs: Joi.number().min(0),
  });

  return schema.validate(buildings);
};

const Buildings = mongoose.model("Buildings", buildingsSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateBuildings;
module.exports = Buildings;
