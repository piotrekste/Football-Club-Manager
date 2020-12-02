const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const ObjectId = mongoose.Schema.Types.ObjectId;

const playersSchema = new mongoose.Schema({
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
  position: {
    type: String,
    enum: ["", "obronca", "napastnik", "bramkarz", "pomocnik"], //todo more
    default: "",
  },
  login: {
    type: String,
    default: "",
    maxlength: 420,
  },
  birth: {
    type: Date,
    default: Date.now,
  },

  statistics_id: {
    type: [ObjectId],
    default: [],
    ref: "Statistics",
  },
  contract_id: {
    type: [ObjectId],
    default: [],
    ref: "Contracts",
  },
  trainings_id: {
    type: [ObjectId],
    default: [],
    ref: "Trainings",
  },
  meeting_id: {
    type: [ObjectId],
    default: [],
    ref: "Meetings",
  },
});

const validatePlayers = (players) => {
  const schema = Joi.object({
    first_name: Joi.string().max(420),
    last_name: Joi.string().max(420),
    email: Joi.string().max(420),
    password: Joi.string().max(420),
    login: Joi.string().max(420),
    birth: Joi.date(),
    position: Joi.string().valid(
      "obronca",
      "napastnik",
      "bramkarz",
      "pomocnik",
    ), //todo more
    statistics_id: Joi.array().items(Joi.objectId()),
    contract_id: Joi.array().items(Joi.objectId()),
    trainings_id: Joi.array().items(Joi.objectId()),
    meeting_id: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(players);
};

const Players = mongoose.model("Players", playersSchema);
//exports.validateBuildings = validateBuildings;
module.exports = validatePlayers;
module.exports = Players;
