const mongoose = require('mongoose');

// Connect to MongoDB


function connect() {
    mongoose.connect("mongodb://0.0.0.0/testdb").then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to MongoDB");
        console.log(error);
    });
}

module.exports = connect