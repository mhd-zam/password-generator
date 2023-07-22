const express = require("express");
const app = express();
const cors=require('cors')
const cookieParser = require("cookie-parser");
const clientRouter = require("./router/client");
const adminRouter = require("./router/admin");
require('./controller/sheduleJob')
const morgan = require("morgan");
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cookieParser());

require("dotenv").config();

app.use(
  cors({
    origin:"http://127.0.0.1:5173",
    credentials: true,
  })
);

mongoose
  .connect(process.env.DATABASE, {
    dbName: "PasswordManagement",
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", clientRouter);

app.use("/admin", adminRouter);

app.listen(4000, () => {
  console.log("server running");
});

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500; // Default to 500 Internal Server Error if statusCode is not set
  const message = err.message || "Internal Error";
  res.status(statusCode).json({ message });
});
