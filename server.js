const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");

const productRouter = require("./routes/products"); 
const sizeRouter = require("./routes/sizes"); 

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/products", productRouter);
app.use("/api/sizes", sizeRouter);

const port = 3001;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`);
  });