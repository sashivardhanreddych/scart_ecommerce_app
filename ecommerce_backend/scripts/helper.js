const sql = require('mssql');
const config = require('../dbconfig');
var StringDecoder = require("string_decoder").StringDecoder;
var decoder = new StringDecoder("utf8");