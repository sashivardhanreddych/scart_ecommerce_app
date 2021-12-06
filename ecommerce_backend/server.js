// Imports from npm dependencies
const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const helmet = require("helmet");
const bodyParser = require("body-parser");

// initializing app from express
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();


//import custom modules or files
const config = require('./dbconfig.js');
// const userRouter=require('./routes/userRoutes')
const genericRouter=require('./routes/genericRoutes')



//middlewares in express

// app.use(express.json({ limit: '2048kb' }));
// app.use(express.urlencoded({ extended: true, limit: '1024kb' }));
app.use(cors());
app.use(helmet());


//extract
// const userController = require('./controllers/userController');
const helper= require('./scripts/helper');


const port = +process.env.server_port || 4000;
app.listen(port, (err) => {
    if (err) {
      console.log('there is an error while connecting to server');
    }
    else
    { 
      console.log(`server is listening on port ${port}`);
    }
})

//routing to-->
// generic

app.use('/generic', genericRouter);
// app.use('/user', userRouter);
// app.use('api/v1/admin', adminRouter);
// app.use('/post', postRouter);
// app.use('/frnd', frndRouter);
// app.use('/save',savedPostRouter);

app.get('/refresh', async(req, res, next) => {
    
  console.log('succesfully hit this request');
     if (req.headers.authorization == undefined)
     {
        return res.status(401).json({message:'You are not logged In. Please Login.'})
     }
     
     let token = req.headers.authorization.split(' ')[1];
     if (!token)
     {
         return res.status(401).json({message:'You are not logged In. Please Login.'})
     }
   
  const origToken = token;
  let payload;
  try {
    payload = await jwt.verify(origToken, process.env.TOKEN_KEY);
     if (!payload) {
              return res.status(401).json({ message: 'Unauthorized Access.' });
    }
    let email = payload.email;
    const pool = await new sql.ConnectionPool(config).connect();
    let user= await pool.request().query(`select * from users where email='${email}' `);
    if (user.recordset.length==0) {
         
      return res.status(401).json({ message: `You either recently changed Password or not registered for the site` });
    }
    return res.status(200).json({ message:'success',user:user.recordset[0]})
    
  }
  catch (err) {

     console.log('Error in refresh token');
        if (err instanceof jwt.TokenExpiredError) {
                    return res.status(401).json({ message: 'Token is expired,please login' });
          }
              
    return res.status(500).json({ message: 'Internal Server Error' });

  }
  finally {
    sql.close();
  }
  
})

// app.get('/personalizedFeed/:userId', helper.recommendedFeed);

// http://ec2-54-161-48-202.compute-1.amazonaws.com/hackathon/hustlers/api/
//wildcard route
app.all('*', (req, res, next) => {
    return res.status(401).json({message:`Can't find ${req.originalUrl} on this server`})
})
