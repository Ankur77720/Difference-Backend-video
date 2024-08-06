const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    username: String,
    email: String,
    posts: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    } ]
})


module.exports = mongoose.model('user', userSchema);