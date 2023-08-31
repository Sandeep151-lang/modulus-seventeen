const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const env = require('dotenv');
const create = require('./controller/crud');
// const tournament = require('./controller/tournament');
// const participents = require('./controller/participents');


env.config()
require('./db/dbConn')

const corsOptions = {
   origin: true, //included origin as true
   credentials: true, //included credentials as true
 };
 app.use(cors(corsOptions));
 app.options('*',cors())
 app.use(bodyparser.json())
 app.use(express.urlencoded({extended:false}))
 app.use(express.json());




 app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next()
  })

  app.use('/user',create)
 



 app.listen(process.env.PORT || 2000,(err)=>{
    if(err) throw err
    console.log(`connection 5000`)
 })



 module.exports = app