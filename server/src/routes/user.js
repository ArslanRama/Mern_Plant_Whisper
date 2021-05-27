const router = require('express').Router();
const User = require('../models/User');
const bcrypt= require('bcrypt')

//! connectin Address Schema in User Model
router.get('/all', (req, res) => {
  User.findById((err, user) => {
      console.log(user)
      res.json(user)
  }).populate('addressSchema')
})


//! sign up 
router.post('/create', (req, res)=>{
  // save a user
  const newUser = new User(req.body);
  newUser.save((err, doc)=>{
      if(err) throw err.message;
      res.json(doc)
  })
})

//! sign in
router.post('/signin', (req, res) =>{
  const{email, password} = req.body;
  User.find({email, password}, (err, data)=>{
    res.json(data)
  })
})




module.exports = router;