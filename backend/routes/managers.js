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

  let user = await Manager.findOne({ login: req.body.login });
  if (!user) return res.status(400).send("Invalid login or password.");

  //let validPassword = await bcrypt.compare(value.password, user.password);
  let password = await Manager.findOne({ password: req.body.password });
  if (!password) return res.status(400).send("Invalid login or password.");

  res
    .header("x-auth-token")
    .send(_.pick(user, ["_id", "first_name", "last_name", "email"]));
});
module.exports = router;
