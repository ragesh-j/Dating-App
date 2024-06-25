const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;
const userdb = require("../models/UserModel");
const jwt=require('jsonwebtoken')
const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userdb.findOne({ googleId: profile.id });

            if (!user) {
                user = new userdb({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                });

                await user.save();
                user.isNewUser=true;
            }else{
                user.isNewUser=false
            }
            const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
            
            return done(null, {user,token});

        } catch (error) {
            return done(error, null);
        }
    })
);


module.exports = passport;