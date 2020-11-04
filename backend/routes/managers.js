const router = require("express").Router();
const { validateManagers } = require("../models/managers");

let Manager = require("../models/managers");

router.route("/").get((req, res) => {
  Manager.find()
    .then((manager) => res.json(manager))
    .catch((err) => res.status(400).json("błąd: " + err));
});
router.get("/:id", async (req, res) => {
  const manager = await Manager.findById(req.params.id);
  if (!manager)
    res.status(404).send(`manager with id ${req.params.id} not found!`);
  res.send(manager);
});

module.exports = router;
