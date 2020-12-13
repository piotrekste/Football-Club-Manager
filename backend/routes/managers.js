const router = require("express").Router();
const { validateManagers } = require("../models/managers");
const _ = require("lodash");
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

router.post("/", async (req, res) => {
  let user = await Manager.findOne({ login: req.body.login });
  if (!user) return res.status(400).send("Invalid login or password.");

  let password = await Manager.findOne({ password: req.body.password });
  if (!password) return res.status(400).send("Invalid login or password.");

  res
    .header("x-auth-token")
    .send(_.pick(user, ["_id", "first_name", "last_name", "email"]));
});

router.put("/:id/meeting_id", async (req, res) => {
  const manager = await Manager.findById(req.params.id);
  if (!manager)
    res.status(404).send(`Manager with id ${req.params.id} not found!`);
  res.send(manager);

  manager.meeting_id.push(req.body.meeting_id);

  let managerr;

  managerr = await Manager.findByIdAndUpdate(
    req.params.id,
    {
      meeting_id: manager.meeting_id,
    },
    {
      new: true,
    },
  );

  if (!managerr)
    return res.status(404).send("Manager with the given ID was not found.");

  res.send(managerr);
});
module.exports = router;
