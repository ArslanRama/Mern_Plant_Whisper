const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a Schema 
const userSchema = new Schema({
    email: String,
    password: String,
    username: String
})

// declare Schema as a model
const User = mongoose.model('User', userSchema) 
// export User Model
module.exports = User; 