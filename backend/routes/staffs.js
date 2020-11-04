const router = require("express").Router();
const { validateStaff } = require("../models/staffs");

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
module.exports = router;
