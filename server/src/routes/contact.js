const router = require('express').Router();
const Contact = require('../models/Contact');

router.post('/send',(req, res)=>{
    // console.log(req.body)
    const {name, email, message}= req.body
    const newContact = new Contact({
        name, email, message
    })

    newContact.save((err, doc)=>{
        console.log(doc)
        res.json('Thank you for your message! We will get in touch with you soon')
    })
})



module.exports = router;