const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sql = require("mssql");
const bcrypt = require("bcrypt");

//custom imports 
const config = require('./../dbconfig');
const generateRandomToken = require("../utilities/generateRandomToken").generateRandomToken;
const Email = require("./../utilities/email");
const { check, validationResult } = require("express-validator");


exports.signup = async (req, res, next) => {
  req.body.role = "user";
  req.body.age = parseInt(req.body.age);
  console.log(req.body.dob);
  //req.body.dob = `${new Date('2000-06-05').getFullYear()}-${new Date('2000-06-05').getMonth() + 1}-${new Date('2000-06-05').getDate()}`;
  // req.body.personal_interest = "";
  // console.log(req.body);

  let pool;
  try {
    req.body.password = await bcrypt.hash(
      req.body.password,
      +process.env.saltRounds
    );
    pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    request.input("email", req.body.email);
    request.input("name", req.body.name);
    request.input("password", req.body.password);
    request.input("role", req.body.role);
    request.input("gender", req.body.gender);
    request.input("age", req.body.age);
    request.input("dob", sql.DateTime, new Date(req.body.dob));
    // request.input('dob', req.body.dob);
    request.input("mobile_number", req.body.mobile_number);
    response = await request.execute("sp_userRegistration");
    console.log(response);
    if (response.recordset[0].Id < 0) {
      return res.status(400).json({
        message: `Already registered with this email- ${req.body.email}`,
      });
    } else {
      return res.status(200).json({ message: "Succesfully Registered" });
    }
  } catch (err) {
    console.log(
      "Error while connecting to Database or inserting data into table or hashing the password"
    );
    console.log(err);
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  } finally {
    if (pool) pool.close();
  }
};
