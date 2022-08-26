const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models');
const bcrypt = require('bcrypt');

module.exports = (passport)=>{
passport.use(new LocalStrategy({
    usernameField:'Email',
    passwordField:'Password',
    passReqToCallback:true,
}, async (req,email,password,done)=>{
    try{
        const user = await User.findOne({where:{email}});
        if(user){
            const result = await bcrypt.compare(password,user.password);
            if(result)done(null,user);
            else done(null,false,{message:'Not Correct!'});
        }
        else done(null,false,{message:'Not Register!'});
    }

    catch(error){
        console.error(error);
        done(error);
    }
}))
}
