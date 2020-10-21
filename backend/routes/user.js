const router = require("express").Router();

let User = require("../models/user");

router.route("/").get((req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("błąd: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("user added"))
    .catch((err) => res.status(400).json("błąd: " + err));
});

module.exports = router;
