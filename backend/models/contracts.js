const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;

const contractsSchema = new mongoose.Schema({
  salary: {
    type: Number,
    default: 0,
  },
  pariod: {
    type: Number,
    default: 0,
  },
  breakup_penalty: {
    type: Number,
    default: 0,
  },
});

const validateContracts = (contracts) => {
  const schema = Joi.object({
    salary: Joi.number().min(0),
    pariod: Joi.number().min(0),
    duration: Joi.number().min(0),
  });

  return schema.validate(contracts);
};

const Contracts = mongoose.model("Contracts", contractsSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validateContracts;
module.exports = Contracts;
