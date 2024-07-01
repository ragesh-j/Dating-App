const express=require('express')
const cors=require('cors')
const app = express();
app.use(express.json())
app.use(cors())
require('dotenv').config();
const passport = require("passport");
require("../middleware/passport_setup")
const userRoutes=require('./UserRegistration')
const userSiginRoutes=require('./UserSignin')
const authGoogle=require("./authGoogle")
const profileRoutes=require("./profile")
const employementRoutes=require("./employement")
const locationRoutes=require("./locationSave")
const sameInterestRoutes=require('./sameInterest')
const profileView=require("./userProfileView")
app.use(express.json());
app.use(passport.initialize());

app.use("/",authGoogle)
app.use('/',userRoutes)
app.use('/',userSiginRoutes)
app.use("/",profileRoutes)
app.use("/",employementRoutes)
app.use("/",locationRoutes)
app.use("/",sameInterestRoutes)
app.use("/",profileView)



module.exports=app