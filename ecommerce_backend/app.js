const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const sql = require('mssql');


const app = express();
require('dotenv').config();




//import custom modules or files
const config = require('./dbconfig.js');
const userRouter=require('./routes/userRoutes')
const genericRouter=require('./routes/genericRoutes')