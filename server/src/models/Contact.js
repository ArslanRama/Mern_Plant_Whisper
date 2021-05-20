const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a Schema 
const contactSchema = new Schema({
    name: String,
    email: String,
    message: String,
})

// declare Schema as a model
const Contact = mongoose.model('Contact', contactSchema) 
// export User Model
module.exports = Contact; 