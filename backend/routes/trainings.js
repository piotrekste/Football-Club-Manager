const router = require("express").Router();
const { validateTrainings } = require("../models/trainings");

let Trainings = require("../models/trainings");

router.route("/").get((req, res) => {
  Trainings.find()
    .then((trainings) => res.json(trainings))
    .catch((err) => res.status(400).json("błąd: " + err));
});

router.get("/:id", async (req, res) => {
  const trainings = await Trainings.findById(req.params.id);
  if (!trainings)
    res.status(404).send(`trainings with id ${req.params.id} not found!`);
  res.send(trainings);
});

module.exports = router;
