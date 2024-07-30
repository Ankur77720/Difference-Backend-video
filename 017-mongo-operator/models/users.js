const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    isActive: Boolean
})

module.exports = mongoose.model('user', userSchema);