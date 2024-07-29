const express = require('express');
const app = express();
const db = require("./config/mongodb")
db();
const userModel = require("./models/userSchema")

// CRUD
// Create
// READ
// Update
// Delete



app.get('/', async (req, res) => {

    const newUser = await userModel.create({
        username: "harsh",
        password: "harsh",
        email: "a@a.com"
    })

    res.send(newUser)

})

app.get("/read", async (req, res) => {

    const users = await userModel.find({
        username: "harsh"
    })

    res.send(users)

})

app.get('/update', async (req, res, next) => {
    const updatedUser = await userModel.findOneAndUpdate({
        username: "harsh"
    }, {
        email: "d@d.com"
    }, {
        new: true
    })

    res.send(updatedUser)

})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})