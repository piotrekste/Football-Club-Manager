const router = require("express").Router();
const { validateBuilding } = require("../models/buildings");

let Building = require("../models/buildings");

router.route("/").get((req, res) => {
  Building.find()
    .then((building) => res.json(building))
    .catch((err) => res.status(400).json("błąd: " + err));
});

router.get("/:id", async (req, res) => {
  const building = await Building.findById(req.params.id);
  if (!building)
    res.status(404).send(`building with id ${req.params.id} not found!`);
  res.send(building);
});

module.exports = router;
