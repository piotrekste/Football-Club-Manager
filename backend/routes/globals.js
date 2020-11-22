const router = require("express").Router();
const { validateGlobals } = require("../models/globals");

let Globals = require("../models/globals");

router.route("/").get((req, res) => {
  Globals.find()
    .then((globals) => res.json(globals))
    .catch((err) => res.status(400).json("błąd: " + err));
});

router.get("/:id", async (req, res) => {
  const globals = await Globals.findById(req.params.id);
  if (!globals)
    res.status(404).send(`globals with id ${req.params.id} not found!`);
  res.send(globals);
});
router.post("/", async (req, res) => {
  //const { error } = validateFlashset(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let globals = new Globals(req.body);
  await globals.save();
  res.send(globals);
});

module.exports = router;
