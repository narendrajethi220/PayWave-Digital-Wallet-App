const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();
const mainRouter = require("./routes/index");

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log(`🚀 started on ${PORT}`);
});
