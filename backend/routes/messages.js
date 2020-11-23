const router = require("express").Router();
const { validateMessages } = require("../models/messages");

let Messages = require("../models/messages");

router.route("/").get((req, res) => {
  Messages.find()
    .then((messages) => res.json(messages))
    .catch((err) => res.status(400).json("błąd: " + err));
});
router.get("/:id", async (req, res) => {
  const messages = await Messages.findById(req.params.id);
  if (!messages)
    res.status(404).send(`messages with id ${req.params.id} not found!`);
  res.send(messages);
});

router.post("/", async (req, res) => {
  //const { error } = validateFlashset(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let messages = new Messages(req.body);
  await messages.save();
  res.send(messages);
});

module.exports = router;
