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

const building = require("./routes/buildings");
app.use("/building", building);

const contracts = require("./routes/contracts");
app.use("/contracts", contracts);

const managers = require("./routes/managers");
app.use("/managers", managers);

const matches = require("./routes/matches");
app.use("/matches", matches);

const meetings = require("./routes/meetings");
app.use("/meetings", meetings);

const players = require("./routes/players");
app.use("/players", players);

const staffs = require("./routes/staffs");
app.use("/staffs", staffs);

const trainings = require("./routes/trainings");
app.use("/trainings", trainings);

const statistics = require("./routes/statistics");
app.use("/statistics", statistics);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
