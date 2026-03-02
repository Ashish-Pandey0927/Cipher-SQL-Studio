require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectMongo = require("./config/mongo");

const assignmentRoutes = require("./routes/assignmentRoutes");
const executionRoutes = require("./routes/executionRoutes");
const hintRoutes = require("./routes/hintRoutes")

const app = express();

connectMongo();

app.use(cors());
app.use(express.json());

app.use("/api/assignments", assignmentRoutes);
app.use("/api/execute", executionRoutes);
app.use("/api/hint", hintRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});