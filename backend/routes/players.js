const router = require("express").Router();
const { validatePlayers } = require("../models/players");
const _ = require("lodash");
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

router.delete("/:id", async (req, res) => {
  let players = await Players.findByIdAndRemove(req.params.id, (err) => {
    if (err) res.status(404).send(err);
  });

  res.send(`Players with id ${req.params.id} deleted`);
});

router.post("/", async (req, res) => {
  let user = await Players.findOne({ login: req.body.login });
  if (!user) return res.status(400).send("Invalid login or password.");

  let password = await Players.findOne({ password: req.body.password });
  if (!password) return res.status(400).send("Invalid login or password.");

  res
    .header("x-auth-token")
    .send(_.pick(user, ["_id", "first_name", "last_name", "email"]));
});

router.put("/", async (req, res) => {
  let players = new Players(req.body);
  await players.save();
  res.send(players);
});

router.put("/:id/meeting_id", async (req, res) => {
  const players = await Players.findById(req.params.id);
  if (!players)
    res.status(404).send(`Players with id ${req.params.id} not found!`);
  res.send(players);

  players.meeting_id.push(req.body.meeting_id);

  let playerss;

  playerss = await Players.findByIdAndUpdate(
    req.params.id,
    {
      meeting_id: players.meeting_id,
    },
    {
      new: true,
    },
  );

  if (!playerss)
    return res.status(404).send("Player with the given ID was not found.");

  res.send(playerss);
});
module.exports = router;
