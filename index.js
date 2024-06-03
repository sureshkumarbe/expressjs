const con = require("./database");
const express = require("express");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.json());

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.get("/", (req, res) => {
  con.query("SELECT * FROM res_list", (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send({ data: result, statuscode: 200, status: "success" });
  });
});

app.post("/api/add_employee", (req, res) => {
  let data = {
    emp_name: req.body.name,
    emp_mobilenumber: req.body.mobilenumber,
    emp_location: req.body.location,
    emp_salary: req.body.salary,
  };

  console.log(data);

  const sql = "INSERT INTO employee_list SET ?";

  con.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send({ message: "Record inserted" });
  });
});
