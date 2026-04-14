const express = require("express");
const cors = require("cors");
const { router } = require("./routes/route");

require("dotenv").config();

const app = express();
const port = 4500;

const corsOptions = {
  origins: "http://localhost:5173/",
  methods: "GET,POST",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
