var express = require("express");
var router = express.Router();
var http = require("http");
var socketio = require("socket.io");

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.post("/savedata", function (req, res, next) {
  console.log(res);
});

module.exports = router;
