const express = require('express');
const app = express();
const plantRouter = require('./src/routes/plant')
const contactRouter = require('./src/routes/contact')
// client connectection 
const cors = require('cors')
//! MongoDB and dotenv
require('dotenv').config()
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

//! database name and url
const DB_URL = process.env.MongoDB_Link
mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB database is successfully connected'))
    .catch(() => console.log('Database connection failed!'))

app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use(express.json())

//! routes as REST API for frontend
app.get('/user/data', (req, res) => {
    res.json('test worj')
})
//! testing INSOMNIA
app.get('/login', (req, res) => {
    res.status(200).json({ msg: 'login page' })
})
app.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username === 'Aslan' && password === '123456') {
        return res.status(200).json({ msg: 'logged in successfully' })
    }
        res.json({ msg: 'wrong password' })

})

app.use('/plant', plantRouter);
app.post('/user/data', (req, res) => {
    // some data from frontend react UI
    console.log(req.body)
    // Save data to database
    // change or use data and send back message to fronend 
    res.json({
        msg: 'successfully received!',
        username: req.body.username,
        email: req.body.email
    })
})



app.use('/contact', contactRouter);
/* app.post('/user/msg', (req, res) => {
    console.log(req.body)
    res.json({
        msg: 'Thanks for your Msg! we will get in touch soon ',
        name: req.body.name,
        email: req.body.email,
        message: req.body.email

    })
}) */

// 

//! listen app with port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})