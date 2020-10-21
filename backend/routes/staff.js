const router = require("express").Router();

let Staff = require("../models/staff");

router.route("/").get((req, res) => {
  Staff.find()
    .then((staff) => res.json(staff))
    .catch((err) => res.status(400).json("błąd: " + err));
});

module.exports = router;
