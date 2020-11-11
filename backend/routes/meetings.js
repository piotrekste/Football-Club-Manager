const router = require("express").Router();
const { validateMeetings } = require("../models/meetings");

let Meetings = require("../models/meetings");

router.route("/").get((req, res) => {
  Meetings.find()
    .then((meetings) => res.json(meetings))
    .catch((err) => res.status(400).json("błąd: " + err));
});
router.get("/:id", async (req, res) => {
  const meetings = await Meetings.findById(req.params.id);
  if (!meetings)
    res.status(404).send(`meetings with id ${req.params.id} not found!`);
  res.send(meetings);
});

router.post("/", async (req, res) => {
  //const { error } = validateFlashset(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let meetings = new Meetings(req.body);
  await meetings.save();
  res.send(meetings);
});

module.exports = router;
