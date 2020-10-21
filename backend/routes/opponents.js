const router = require("express").Router();

let Opponents = require("../models/opponents");

router.route("/").get((req, res) => {
  Opponents.find()
    .then((opponents) => res.json(opponents))
    .catch((err) => res.status(400).json("błąd: " + err));
});

module.exports = router;
