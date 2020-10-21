const router = require("express").Router();

let Features = require("../models/features");

router.route("/").get((req, res) => {
  Features.find()
    .then((features) => res.json(features))
    .catch((err) => res.status(400).json("błąd: " + err));
});

module.exports = router;
