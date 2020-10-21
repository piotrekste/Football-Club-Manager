const router = require("express").Router();

let Statistics = require("../models/statistics");

router.route("/").get((req, res) => {
  Statistics.find()
    .then((statistics) => res.json(statistics))
    .catch((err) => res.status(400).json("błąd: " + err));
});

module.exports = router;
