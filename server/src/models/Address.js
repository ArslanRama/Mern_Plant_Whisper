const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    country: String,
    city: String,
    zipcode: String,
    street: String,
})

const Address =mongoose.model('Address', addressSchema)

module.exports = Address;