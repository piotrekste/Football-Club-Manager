const router = require("express").Router();
const { validateStatistics } = require("../models/statistics");

let Statistics = require("../models/statistics");

router.route("/").get((req, res) => {
  Statistics.find()
    .then((statistics) => res.json(statistics))
    .catch((err) => res.status(400).json("błąd: " + err));
});

router.get("/:id", async (req, res) => {
  const statistics = await Statistics.findById(req.params.id);
  if (!statistics)
    res.status(404).send(`statistics with id ${req.params.id} not found!`);
  res.send(statistics);
});

module.exports = router;
