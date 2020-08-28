var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mousedata",
});

/* GET users listing. */
router.post("/", function (req, res, next) {
  const mouse_data = {
    ip: "192.168.1.1",
    data: JSON.stringify(req.body.frames),
    end_time: req.body.endtime,
    start_time: req.body.starttime,
  };

  connection.query(
    "INSERT INTO position_records SET ?",
    mouse_data,
    (err, docs) => {
      if (err) throw err;

      res.send("Last insert ID: " + docs.insertId);
    }
  );
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  connection.query(
    "SELECT data,start_time,end_time FROM position_records order by created desc limit 1 ",
    (err, row) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(row[0].data);
      const full_data = {};
      full_data.newdata = JSON.parse(row[0].data);
      full_data.start_time = row[0].start_time;
      full_data.end_time = row[0].end_time;
      res.send(full_data);
    }
  );
});

module.exports = router;
