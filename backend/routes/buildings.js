const router = require("express").Router();

let Building = require("../models/buildings");

router.route("/").get((req, res) => {
  Building.find()
    .then((building) => res.json(building))
    .catch((err) => res.status(400).json("błąd: " + err));
});

module.exports = router;
