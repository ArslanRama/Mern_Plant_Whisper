const express = require('express');
const app = express();
const plantRouter = require('./src/routes/plant')
const contactRouter = require('./src/routes/contact')
const userRouter = require('./src/routes/user')
const cookieParser = require('cookie-parser')
// client connection
const cors = require('cors')
//! MongoDB and dotenv
require('dotenv').config()
const mongoose = require("mongoose");

// Cookie Parser
app.use(cookieParser())

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

//! Routing
app.use('/plant', plantRouter);
app.use('/user', userRouter);
app.use('/contact', contactRouter);

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



//! listen app with port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
