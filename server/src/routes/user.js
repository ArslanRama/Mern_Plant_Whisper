const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
const JWT = require('jsonwebtoken');
require('../config/passport')



router.post('/register',(req,res)=>{
  const { username,email, password } = req.body;
  User.findOne({username},(err,user)=>{
      if(err)
          res.status(500).json({message : {msgBody : "Oops !! Error happened", msgError: true}});
      if(user)
          res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
      else{
          const newUser = new User({username,email, password});
          newUser.save(err=>{
              if(err)
                  res.status(500).json({message : {msgBody : "Oops !! Error happened", msgError: true}});
              else
                  res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
          });
      }
  });
});

const signToken = userID =>{
  return JWT.sign({
      iss : "Ahmad",
      sub : userID
  },"Ahmad",{expiresIn : "1h"});
}

router.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
  if(req.isAuthenticated()){
     const {_id,username,email} = req.user;
     const token = signToken(_id);

    /** Important Cookies Security:
     * httpOnly : clientSide cant apply js to the cookie to prevent (XSS)
     * sameSite: protect from cross-site request forgery attacks */
     res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
     res.status(200).json({isAuthenticated : true,user : {username,email}});
  }
});

router.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
  res.clearCookie('access_token');
  res.json({user:{username : "",email: ""},success : true});
});

module.exports = router;