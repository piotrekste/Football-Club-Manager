const router = require("express").Router();
const { validatePlayers } = require("../models/players");

let Players = require("../models/players");

router.route("/").get((req, res) => {
  Players.find()
    .then((players) => res.json(players))
    .catch((err) => res.status(400).json("błąd: " + err));
});

router.get("/:id", async (req, res) => {
  const players = await Players.findById(req.params.id);
  if (!players)
    res.status(404).send(`players with id ${req.params.id} not found!`);
  res.send(players);
});

module.exports = router;

/**
 * const router = require("express").Router();

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

 */
