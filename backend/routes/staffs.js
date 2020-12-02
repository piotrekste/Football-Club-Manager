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
  // const Manager = res.locals.models.plant;

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
  //const { error } = validateFlashset(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let staff = new Staff(req.body);
  await staff.save();
  res.send(staff);
});
router.post("/", async (req, res) => {
  /*
  validateLogin = (req) => {
    const schema = {
      email: Joi.string().max(255).required().email(),
      password: Joi.string().min(8).max(1024).required(),
    };
    return Joi.validate(req, schema);
  };
*/

  // const { error, value } = req.body;
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await Staff.findOne({ login: req.body.login });
  if (!user) return res.status(400).send("Invalid login or password.");

  //let validPassword = await bcrypt.compare(value.password, user.password);
  let password = await Staff.findOne({ password: req.body.password });
  if (!password) return res.status(400).send("Invalid login or password.");

  res.header("x-auth-token").send(_.pick(user, ["_id", "username", "email"]));
});

module.exports = router;
