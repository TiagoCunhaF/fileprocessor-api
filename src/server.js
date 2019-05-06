const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.on("connectBox", box => {
    socket.join(box);
  });
});

mongoose.connect(
  "mongodb+srv://tcunha:tcunha@cluster0-puvbp.mongodb.net/boxfiles?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/files", express.static(path.resolve(__dirname, "..", "temp")));

requireDir("./models");

app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.send("ok novo");
});

server.listen(process.env.PORT || 3001);
