const router = require("express").Router();
const { validateContracts } = require("../models/contracts");

let Contract = require("../models/contracts");

router.route("/").get((req, res) => {
  Contract.find()
    .then((contract) => res.json(contract))
    .catch((err) => res.status(400).json("błąd: " + err));
});
router.get("/:id", async (req, res) => {
  const contract = await Contract.findById(req.params.id);
  if (!contract)
    res.status(404).send(`contract with id ${req.params.id} not found!`);
  res.send(contract);
});

module.exports = router;
