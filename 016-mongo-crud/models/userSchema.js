const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
})


module.exports = mongoose.model('user', userSchema);