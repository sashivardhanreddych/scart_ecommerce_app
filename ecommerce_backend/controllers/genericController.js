// Imports from npm dependencies
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sql = require("mssql");
const bcrypt = require("bcrypt");

//custom imports 
const config = require('./../dbconfig');
const generateRandomToken = require("../utilities/generateRandomToken.js").generateRandomToken;
const Email = require("./../utilities/email");
const { check, validationResult } = require("express-validator");



exports.verification = async (req, res, next) => {
  if (req.headers.authorization == undefined) {
    return res
      .status(401)
      .json({ message: "You are not logged In. Please Login." });
  }

  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "You are not logged In. Please Login." });
  }

  const origToken = token;
  var payload;
  const pool = await new sql.ConnectionPool(config).connect();

  try {
    payload = await jwt.verify(origToken, process.env.TOKEN_KEY);
  } catch (err) {
    console.log("Error while verifying jwt token");
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token is expired,please login" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!payload) {
    return res.status(401).json({ message: "Unauthorized Access." });
  }

  let email = payload.email;
  // console.log(payload);
  try {
    console.log(
      `select * from users where email='${email}' and lastJwtTokenGeneratedAt >=lastPasswordChangedAt`
    );
    let user = await pool
      .request()
      .query(
        `select * from users where email='${email}' and lastJwtTokenGeneratedAt >=lastPasswordChangedAt`
      );
    if (user.recordset.length == 0) {
      return res
        .status(401)
        .json({
          message: `You either recently changed Password or not registered for the site`,
        });
    }
    // res.locals.user = user.recordset[0];
    // req.app.locals.user1={name:res.locals.user.name}
        console.log(user);
    res.locals.user = user.recordset[0];
    res.locals.user1 = { name: res.locals.user.name };
  } catch (err) {
    console.log("Some Error has occured in Verification(Token verification)");
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    console.log("finally block in verification");
    if (pool) pool.close();
  }

  next();
};




/**
 * @description Used to send the data the user registration information
 * 
 * @param {email,fullname,password,gender,age,dob,phone
 * } req 
 * @param {*} res respective message get
 * @param {*} next 
 * @returns status code from the http
 */

exports.signup = async (req, res, next) => {
  // req.body.role = "user";
  // req.body.age = parseInt(req.body.age);
  // console.log(req.body.dob);
  //req.body.dob = `${new Date('2000-06-05').getFullYear()}-${new Date('2000-06-05').getMonth() + 1}-${new Date('2000-06-05').getDate()}`;
  // req.body.personal_interest = "";
  console.log("body data:"+req.body);

  let pool;
  try {
    req.body.password = await bcrypt.hash(
      req.body.password,
      +process.env.saltRounds
    );
    console.log("hash password"+req.body.password)
    pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    request.input("email", req.body.email);
    request.input("fullname", req.body.fullname);
    request.input("password", req.body.password);
    request.input("role", req.body.role);
    request.input("gender", req.body.gender);
    request.input("age", req.body.age);
    request.input("dob", sql.DateTime, new Date(req.body.dob));
    // request.input('dob', req.body.dob);
    request.input("phone", req.body.phone);
    response = await request.execute("sp_users");
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




exports.login = async (req, res, next) => {
  //{email and password}
  console.log("in login api");
  let pool;
  let user;
  try {
    pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    request.input("email", req.body.email);
    response = await request.execute("ValidateUser");
    // console.log(response);
    if (response.recordset[0].Id < 0) {
      return res
        .status(401)
        .json({
          message: `There is no user registered with this email ${req.body.email}`,
        });
    }

    if (
      !(await bcrypt.compare(req.body.password, response.recordset[0].password))
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user = response.recordset[0];
    let token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1hr",
      }
    );
    let lastJwtTokenGeneratedAt = Date.now();
    await pool
      .request()
      .query(
        `update users set lastJwtTokenGeneratedAt=${lastJwtTokenGeneratedAt} where email='${req.body.email}'`
      );
    return res
      .status(200)
      .json({
        message: "Succesfully loggedin",
        signedToken: token,
        loggedInUser: user,
      });
  } catch (err) {
    console.log("some error has occured");
    console.log(err);
    return res.status(500).json({ messsage: "Internal Server Error" });
  } finally {
    if (pool) pool.close();
  }
};

exports.forgotPassword = async (req, res, next) => {
  //send post request with username(gmail);
  // console.log(req.body);
  let pool;
  try {
    const tokenObj = generateRandomToken();
    const subject = "Your Password Reset link is valid only for 10 mins!";
    // http://localhost:4200/forgotPassword
    // console.log(`${req.protocol}://${req.hostname}:4200/resetPassword/${tokenObj.token}`);
    // const resetUrl = `${req.protocol}://${req.hostname}:4200/resetPassword/${tokenObj.token}`;
    const resetUrl = `${req.protocol}://${req.hostname}/hustlers/app/#/resetPassword/${tokenObj.token}`;
    const html = `<a href="${resetUrl}"  target="_blank" style="width:mx-auto" ><button style="border:2px solid blue;padding:12px;color:red">Click to Reset Password</button></a>`;
    const message = "click on the button to reset your password";

    let millisec = Date.now() + 12 * 60 * 1000;
    pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    request.input("email", req.body.email);
    request.input("passwordResetToken", tokenObj.passwordResetToken);
    request.input("resetPasswordExpiresAt", sql.BigInt, millisec);
    response = await request.execute("sp_forgotPassword");

    if (response.recordset[0].Id < 0)
      return res
        .status(400)
        .json({
          message: `There is no user with this email ${req.body.username}`,
        });

    let user = {
      email: req.body.email,
    };

    try {
      await new Email(user).send(subject, html, message);
    } catch (err) {
      console.log("error while sending an email");
      console.log(err);
    }

    return res
      .status(200)
      .json({
        message:
          "A mail has been sent to the registered email(if registered) adress,kindly follow the instructions mentioned in the mail",
      });
  } catch (err) {
    console.log("error occured in forgotpassword api");
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    pool.close();
  }
};

exports.resetPassword = async (req, res, next) => {
  //patch request {newPassword}
  // console.log(req.body);
  if (!req.params.token) {
    return res.status(401).json({ message: "Token is mandatory" });
  }
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //get the user based on resetPasswordToken
  let pool;
  try {
    pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    let millisec = Date.now();
    // console.log(`select * from users where passwordResetToken='${passwordResetToken}' and resetPasswordExpiresAt > ${millisec}`);
    // let user=await pool.request().query(`select * from users where passwordResetToken='${passwordResetToken}' and resetPasswordExpiresAt >${millisec}`);
    // if (user.recordset.length==0) {
    //      return res.status(401).json({ message: 'Reset Password Link is expired.Generate again.' })
    // }
    // user = user.recordset[0];
    req.body.newPassword = await bcrypt.hash(
      req.body.newPassword,
      +process.env.saltRounds
    );
    // console.log(`update users set password='${req.body.newPassword}' where email='${user.email}'`);
    let lastPasswordChangedAt = Date.now();

    request.input("passwordResetToken", passwordResetToken);
    request.input("millisec", sql.BigInt, millisec);
    request.input("password", req.body.newPassword);
    request.input("lastPasswordChangedAt", sql.BigInt, lastPasswordChangedAt);
    response = await request.execute("sp_resetPassword");
    console.log(response);
    if (response.recordset[0].Id < 0)
      return res
        .status(401)
        .json({ message: "Reset Password Link is expired.Generate again." });
    // await pool.request().query(`update users set password='${req.body.newPassword}',lastPasswordChangedAt=${lastPasswordChangedAt} where email='${user.email}'`);
    return res.status(200).json({ message: "succesfully updated" });
  } catch (err) {
    console.log("some error occured ar resetPassword");
    console.log(err);
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  } finally {
    if (pool) pool.close();
  }
};

exports.changePassword = async (req, res, next) => {
  //req{currentPassword,newPassword}
  //focus on lastPasswordChangedAt,lastJwtTokenGeneratedAt
  let user = res.locals.user;
  let pool;
  try {
    if (!(await bcrypt.compare(req.body.currentPassword, user.password))) {
      return res
        .status(401)
        .json({
          message:
            "Your Current Password is not matching with our databse records!",
        });
    }

    const lastPasswordChangedAt = Date.now();
    pool = await new sql.ConnectionPool(config).connect();
    req.body.newPassword = await bcrypt.hash(
      req.body.newPassword,
      +process.env.saltRounds
    );
    await pool
      .request()
      .query(
        `update users set password='${req.body.newPassword}',lastPasswordChangedAt=${lastPasswordChangedAt} where email='${user.email}'`
      );
    let token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1hr",
      }
    );
    return res
      .status(200)
      .json({ message: "succesfully updated", token: token });
  } catch (err) {
    console.log("error in changePassword");
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    pool.close();
  }
};

