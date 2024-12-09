const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./db");
const passport = require("passport");
const path = require("path");
require("./config/config-password");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

connectDB();

const contactsRouter = require("./routes/api/contacts");
app.use("/api/contacts", contactsRouter);

const usersRouter = require("./routes/api/users");
app.use("/api/users", usersRouter);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use("/avatars", express.static(path.join(__dirname, "public/avatars")));

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }
  res.status(500).json({
    message: err.message || `Internal Server Error. Something broke!`,
  });
});

module.exports = app;
