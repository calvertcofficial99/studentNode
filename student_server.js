var express = require("express");
var App = express();
var mysql = require("mysql");
var bodyparser = require("body-parser");

App.use(bodyparser.json());

var con_object = {
  host: "localhost",
  user: "root",
  password: "",
  database: "student"
};

var con = mysql.createConnection(con_object);

con.connect(function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to database");
  }
});

App.post("/", function(req, res) {
  console.log("someone has requested the server to post");
  console.log(req.body);

  res.writeHead(200, { "Content-Type": "plain/text" });
  res.write("thanks for posting data");
  res.end();
  var id = "NULL"
  var roll_no = req.body.roll_no;
  var name = req.body.name;

  var sql_query =
    "INSERT INTO student (id,roll_no,name) VALUES (NULL,'" +
    roll_no +
    "','" +
    name +
    "');";

  con.query(sql_query, function(error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(data));
    }
  });
});

App.get("/", function(req, res) {
  console.log("Someone requested the server to get data");
  res.writeHead(200, { "Content-Type": "application/json" });

  var sql_query = "SELECT * FROM student;";
  con.query(sql_query, function(error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(data));
      data = JSON.stringify(data);
      res.write(data);
      res.end();
    }
  });
});

App.listen(8080);
console.log("server is online");
