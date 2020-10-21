const router = require("express").Router();

let Matches = require("../models/matches");

router.route("/").get((req, res) => {
  Matches.find()
    .then((matches) => res.json(matches))
    .catch((err) => res.status(400).json("błąd: " + err));
});

module.exports = router;
