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

router.put("/:id", async (req, res) => {
  let building;

  building = await Building.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      capacity: req.body.capacity,
      costs: req.body.costs,
      income: req.body.income,
    },
    {
      new: true,
    },
  );

  if (!building)
    return res.status(404).send("building with the given ID was not found.");

  res.send("building changed");
});

module.exports = router;
