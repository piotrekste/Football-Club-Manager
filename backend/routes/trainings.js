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
//Creating new flashset
router.post("/", async (req, res) => {
  //const { error } = validateFlashset(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let trainings = new Trainings(req.body);
  await trainings.save();
  res.send(trainings);
});
module.exports = router;
