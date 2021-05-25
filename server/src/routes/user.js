const router = require('express').Router();
const User = require('../models/User');

router.get('./create', (req, res) => {
    const user = {
        email: 'aslan@gmail.com',
        password: '1234',
        username: 'aslan'
    }
    const newUser = new User(user);
    newUser.save((err, doc) => {
        res.json(doc)
    })
})

module.exports = router;