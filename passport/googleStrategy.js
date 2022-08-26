var GoogleStrategy = require('passport-google-oauth20').Strategy;
var { User } = require('../models');

module.exports = (passport)=>{
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8001/account/google/callback',
    userProfile:"https://www.googleapis.com/oauth2/v3/userinfo",
  },
  async (accessToken, refreshToken, profile, done)=> {
    try{
        const exUser = await User.findOne({ where: { id: profile.id, provider: 'google' } });
        if(exUser){
            done(null,exUser);
        }
        else{
            const newUser = await User.create({
              //email: profile._json && profile._json.kaccount_email,
            Name: profile.displayName,
            id: profile.id,
            provider: 'google',
            })
            done(null,newUser);
        }
    }
    catch(error){
        console.error(error);
      done(error);
    }
    }
))};