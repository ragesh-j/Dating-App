const userRoutes=require('./UserRegistration')
const userSiginRoutes=require('./UserSignin')
const authGoogle=require("./authGoogle")
const express=require('express')
const cors=require('cors')
const app = express();
app.use(express.json())
app.use(cors())
require('dotenv').config();
const passport = require("passport");
require("../middleware/passport_setup")





app.use(express.json());


// setuppassport
app.use(passport.initialize());

app.use("/",authGoogle)


app.use('/',userRoutes)
app.use('/',userSiginRoutes)


module.exports=app