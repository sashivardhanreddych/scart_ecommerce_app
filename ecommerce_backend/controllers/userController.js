const { spawn } = require("child_process");
const sql = require("mssql");
const config = require("./../dbconfig");
exports.editUserDetails = async (req, res, next) => {
  //       name
  //  gender
  //  age
  //  dob date
  //  mobile_number
  //req body{ }
  console.log(req.body);
  // req.body.dob = '1988';
  console.log("reached here");
  let pool;
  try {
    pool = await new sql.ConnectionPool(config).connect();
    let user = res.locals.user;
    console.log("from verifications");
    console.log(user);
    // console.log(`update users set name='${req.body.name}',age=${req.body.age},dob='${req.body.dob}',mobile_number='${req.body.mobile_number}',gender='${req.body.gender}' where email='${user.email}'`);
    await pool
      .request()
      .query(
        `update users set name='${req.body.name}',age=${req.body.age},dob='${req.body.dob}',mobile_number='${req.body.mobile_number}',gender='${req.body.gender}' where email='${user.email}'`
      );
    user = await pool
      .request()
      .query(`select * from users where Id='${user.Id}'`);
    user = user.recordset[0];
    console.log(user);
    return res
      .status(200)
      .json({ message: "succesfully updated", userObj: user });
  } catch (err) {
    console.log("some error has occured");
    console.log(err);
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  } finally {
    pool.close();
  }
};

exports.updateProfilePic = async (req, res, next) => {
  // console.log(req.file);
  //update image filed in databse;
  if (req.fileName == undefined || req.fileName == null) {
    return res.status(400).json({ message: "No file  is received " });
  }
  let user = res.locals.user;
  let pool;

  try {
    pool = await new sql.ConnectionPool(config).connect();
    console.log(`update users set image='${req.fileName}' where Id=${user.Id}`);
    await pool
      .request()
      .query(`update users set image='${req.fileName}' where Id=${user.Id}`);
    let res1 = await pool
      .request()
      .query(`select * from users where Id=${user.Id}`);
    res
      .status(200)
      .json({ message: "succesfully updated", userobj: res1.recordset[0] });
  } catch (err) {
    console.log("Error in upload Profile pic");
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    sql.close();
  }
};

exports.getPersonalizedFeed = async (req, res, next) => {
  // let user = res.locals.user;
  console.log("getPersonalized feed api");
  let pool;
  try {
    pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    request.input("startRow", sql.BigInt, req.body.start);
    request.input("endRow", sql.BigInt, req.body.end);
    // if (user.role !== 'admin') {
    //      request.input('userId', sql.BigInt, user.Id);
    // }

    response = await request.execute("sp_advancedPersonalizedFeed");
    // console.log(response);
    res.status(200).json({ message: "success", posts: response.recordset });
  } catch (err) {
    console.log("some error has occured");
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (pool) {
      pool.close();
    }
  }
};

//  /getUserProfile/:userId
exports.getUserProfile = async (req, res, next) => {
  console.log("getuser profile");
  let pool;
  console.log(req.body);
  try {
    pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    // { userId: '5', curUserId: '5' }
    request.input("curUserId", sql.BigInt, req.body.curUserId);
    request.input("userProfileId", sql.BigInt, req.body.userId);
    response = await request.execute("spGetProfile");
    // console.log(response.recordset);
    return res
      .status(200)
      .json({ message: "success", profileObj: response.recordset[0] });
  } catch (err) {
    console.log("some error has occured");
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    sql.close();
  }
};

// getUserActivity/:userId
exports.getUserActivity = async (req, res, next) => {
  let pool = null;
  try {
    pool = await new sql.ConnectionPool(config).connect();
    const request = pool.request();
    request.input("userId", sql.BigInt, req.params.userId);
    const response = await request.execute("spGetUserActivity");
    console.log(response);
    return res
      .status(200)
      .json({ message: "success", activity: response.recordset });
  } catch (err) {
    console.log("Some error has occured");
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (pool) {
      pool.close();
    }
  }
};

// recommendedFeed/:userId
exports.recommendedFeed = async (req, res, next) => {
  console.log("in recommendedFeed api");
  console.log(req.params);
  const process = spawn("python", ["/scripts/doc2vec_main.py"]);
  console.log("process started asynchronously");
  let tvpId = new sql.Table();
  tvpId.columns.add("id", sql.BigInt);
  let pool = null;
  let request;
  // try {
  //      console.log("check-1");
  //      pool = await new sql.ConnectionPool(config).connect();
  //      request = pool.request();

  // }
  // catch (err) {
  //      console.log("check-2");
  //      console.log('some error has occured in recommendedFeed api');
  //      console.log(err);
  //      res.status(500).json({ message: 'Internal server Error' });
  // }

  console.log("check-3");
  process.stdout.on("data", async (data) => {
    console.log(`stdout:${data}`);
    for (let i in data) {
      tvp_Id.rows.add(parseInt(i));
    }

    // request.input('userId', sql.BigInt, req.params.userId);
    // request.input('tvpId', tvpId);
    // try {
    //      let response = await request.execute('recommendedFeed');
    //      console.log(response.recordset);

    // }
    // catch (err) {
    //      console.log('catch-2');
    //      console.log(err);
    // }
  });

  process.stderr.on("data", (data) => {
    console.log(`stderr:${data}`);
  });

  process.on("close", (code) => {
    console.log(`exited from python:${code}`);
  });
};
