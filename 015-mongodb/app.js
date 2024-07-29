const express = require('express');
const app = express();
const db = require("./config/mongodb")
db()


app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`);
});