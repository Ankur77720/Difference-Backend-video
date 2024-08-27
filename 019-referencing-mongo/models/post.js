const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    caption: String,
    content: String,
})

module.exports = mongoose.model('post', postSchema);