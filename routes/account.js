var express = require('express');

var models = require('../models');
var bcrypt = require('bcrypt');

var router = express.Router();
var passport = require('passport');
var {isLoggedIn,isNotLoggedIn} = require('./middlewares');
//const { json } = require('sequelize/types');
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/login',isNotLoggedIn,passport.authenticate('local',{
  successRedirect : './', 
  failureRedirect : './register', 
  failureFlash : true,
}),(req,res)=>{
  req.session.save(()=>{res.redirect('./')})
})
router.get('/register',function(req,res,next){
  res.render('register');
})  

router.post('/logout',isLoggedIn,(req,res,next)=>{
  req.logout();
  req.session.destroy();
  res.redirect('./login');
})

router.get('/kakao',passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/', 
}), (req, res) => {
  res.redirect('/');
});
router.get('/google',passport.authenticate('google',{scope:['profile']}));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


router.post('/user',isNotLoggedIn,async (req,res,next)=>{
  json = req.body;
  email = json.Email;
  const user = await models.User.findOne({where:{email}});
  if(user){
    req.flash('joinError','Already registerd email');
    return res.redirect('./register');
  }
  models.User.create({
    Email:json.Email,
    Name:json.Name,
    password:bcrypt.hashSync(json.Password,12),
  });
  res.render('login');
});

module.exports = router;