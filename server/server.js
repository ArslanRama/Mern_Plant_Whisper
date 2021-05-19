const express = require('express');
const app = express();
const plantRouter = require('./src/routes/plant')
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
app.use(cors());

app.use(express.json())

//! routes as REST API for frontend
app.use('/plant', plantRouter);
app.post('/user/data', (req, res)=> {
    // some data from frontend react UI
    console.log(req.body)
    // Save data to database
    // change or use data and send back message to fronend 
    res.json({
        msg: 'successfully received!',
        username: req.body.username,
    })
})

//! listen app with port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})