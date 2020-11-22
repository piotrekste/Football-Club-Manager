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
  /*
  validateLogin = (req) => {
    const schema = {
      email: Joi.string().max(255).required().email(),
      password: Joi.string().min(8).max(1024).required(),
    };
    return Joi.validate(req, schema);
  };
*/

  // const { error, value } = req.body;
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await Players.findOne({ login: req.body.login });
  if (!user) return res.status(400).send("Invalid login or password.");

  //let validPassword = await bcrypt.compare(value.password, user.password);
  let password = await Players.findOne({ password: req.body.password });
  if (!password) return res.status(400).send("Invalid login or password.");

  res
    .header("x-auth-token")
    .send(_.pick(user, ["_id", "first_name", "last_name", "email"]));
});

router.put("/:id/meeting_id", async (req, res) => {
  // const Manager = res.locals.models.plant;

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
