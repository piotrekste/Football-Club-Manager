const router = require("express").Router();
const { validateStaff } = require("../models/staffs");
const _ = require("lodash");
let Staff = require("../models/staffs");

router.route("/").get((req, res) => {
  Staff.find()
    .then((staff) => res.json(staff))
    .catch((err) => res.status(400).json("błąd: " + err));
});

router.get("/:id", async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  if (!staff) res.status(404).send(`staff with id ${req.params.id} not found!`);
  res.send(staff);
});
router.put("/:id/meeting_id", async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  if (!staff) res.status(404).send(`staff with id ${req.params.id} not found!`);
  res.send(staff);

  staff.meeting_id.push(req.body.meeting_id);

  let stafff;

  stafff = await Staff.findByIdAndUpdate(
    req.params.id,
    {
      meeting_id: staff.meeting_id,
    },
    {
      new: true,
    },
  );

  if (!stafff)
    return res.status(404).send("staff with the given ID was not found.");

  res.send(stafff);
});

router.put("/", async (req, res) => {
  let staff = new Staff(req.body);
  await staff.save();
  res.send(staff);
});
router.post("/", async (req, res) => {
  let user = await Staff.findOne({ login: req.body.login });
  if (!user) return res.status(400).send("Invalid login or password.");

  let password = await Staff.findOne({ password: req.body.password });
  if (!password) return res.status(400).send("Invalid login or password.");

  res.header("x-auth-token").send(_.pick(user, ["_id", "username", "email"]));
});

router.put("/:id", async (req, res) => {
  let staff;

  staff = await Staff.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role: req.body.role,
    },
    {
      new: true,
    },
  );

  if (!staff)
    return res.status(404).send("staff with the given ID was not found.");

  res.send("staff changed");
});

module.exports = router;
