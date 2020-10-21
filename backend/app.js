const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

const user = require("./routes/user");
app.use("/user", user);

const building = require("./routes/buildings");
app.use("/building", building);

const features = require("./routes/features");
app.use("/features", features);

const opponents = require("./routes/opponents");
app.use("/opponents", opponents);

const staff = require("./routes/staff");
app.use("/staff", staff);

const trainings = require("./routes/trainings");
app.use("/trainings", trainings);

const statistics = require("./routes/statistics");
app.use("/statistics", statistics);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
