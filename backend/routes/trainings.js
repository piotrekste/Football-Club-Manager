const router = require("express").Router();

let Trainings = require("../models/trainings");

router.route("/").get((req, res) => {
  Trainings.find()
    .then((trainings) => res.json(trainings))
    .catch((err) => res.status(400).json("błąd: " + err));
});

module.exports = router;
