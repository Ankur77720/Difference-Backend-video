const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    content: String,
    caption: String
})


module.exports = mongoose.model('post', postSchema);