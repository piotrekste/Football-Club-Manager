const router = require("express").Router();
const { validateMatches } = require("../models/matches");

let Matches = require("../models/matches");

router.route("/").get((req, res) => {
  Matches.find()
    .then((matches) => res.json(matches))
    .catch((err) => res.status(400).json("błąd: " + err));
});

router.get("/:id", async (req, res) => {
  const matches = await Matches.findById(req.params.id);
  if (!matches)
    res.status(404).send(`matches with id ${req.params.id} not found!`);
  res.send(matches);
});

module.exports = router;
