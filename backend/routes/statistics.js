const router = require("express").Router();
const { validateStatistics } = require("../models/statistics");

let Statistics = require("../models/statistics");

router.route("/").get((req, res) => {
  Statistics.find()
    .then((statistics) => res.json(statistics))
    .catch((err) => res.status(400).json("błąd: " + err));
});

router.put("/", async (req, res) => {
  let statistics = new Statistics(req.body);
  await statistics.save();
  res.send(statistics);
});
router.get("/:id", async (req, res) => {
  const statistics = await Statistics.findById(req.params.id);
  if (!statistics)
    res.status(404).send(`statistics with id ${req.params.id} not found!`);
  res.send(statistics);
});

router.put("/:id", async (req, res) => {
  let statiscics;

  statiscics = await Statistics.findByIdAndUpdate(
    req.params.id,
    {
      goals_all: req.body.goals_all,
      goals_season: req.body.goals_season,
      assist_all: req.body.assist_all,
      assist_season: req.body.assist_season,
      matches_all: req.body.matches_all,
      matches_season: req.body.matches_season,
    },
    {
      new: true,
    },
  );

  if (!statiscics)
    return res.status(404).send("statiscics with the given ID was not found.");

  res.send("statiscics changed");
});

module.exports = router;
