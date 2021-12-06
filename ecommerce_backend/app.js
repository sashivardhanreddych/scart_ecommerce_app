/**
 * Summary. Contains of set of dependencies
 *
 * Description. This is the set of methods for usage of different libraries.
 *
 * @author Sashi
 * @since  25/11/2021
 */


// npm dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const sql = require("mssql");


// initializing an express application
const app = express();
require("dotenv").config();

// app.use(
//   fileUpload({
//     useTempFiles: false,
//     limits: { fileSize: 1 * 1024 * 1024 },
//   })
// );

//import custom modules or files
const config = require("./dbconfig.js");
// const userRouter = require("./routes/userRoutes");
const genericRouter = require("./routes/genericRoutes");
// const adminRouter = require("./routes/adminRoutes");
// const postRouter = require("./routes/postRoutes");
// const frndRouter = require("./routes/frndRoutes");

const savedPostRouter = require("./routes/savePostRoute.js");

app.use(bodyParser.json());
//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

//Routes
let baseHref = process.env.API_BASE_HREF;
if (!baseHref) {
  baseHref = "";
}

app.get(baseHref + "/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to Test API",
  });
});

app.use(baseHref + "/generic", genericRouter);
app.use(baseHref + "/user", userRouter);
// app.use('api/v1/admin', adminRouter);
app.use(baseHref + "/post", postRouter);
app.use(baseHref + "/frnd", frndRouter);
app.use(baseHref + "/save", savedPostRouter);

//Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler function
app.use((err, req, res, next) => {
  //respond to client
  const error = err;
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

//Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
