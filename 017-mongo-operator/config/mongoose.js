const mongoose = require('mongoose');


function connect() {
    mongoose.connect("mongodb://0.0.0.0/testdb").then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });
}

module.exports = connect