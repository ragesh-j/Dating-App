const userRoutes=require('./UserRegistration')
const userSiginRoutes=require('./UserSignin')
const express=require('express')
const app = express();
const session = require('express-session');

const passport=require('passport')

const authRoutes=require("./googleAuth")
app.use(express.json())
require('dotenv').config();
require('../middleware/passport-setup')
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/',userRoutes)
app.use('/',userSiginRoutes)
app.use('/auth', authRoutes);

module.exports=app