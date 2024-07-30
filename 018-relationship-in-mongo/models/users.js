const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    content: String,
    caption: String
})


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    posts: [
        postSchema
    ]
})

module.exports = mongoose.model('user', userSchema);