const express = require('express');
const app = express();
const connectToDb = require("./config/mongoose");
connectToDb()
const userModel = require("./models/users")

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/create-user', async (req, res, next) => {
    const user = await userModel.create({
        username: 'a',
        email: 'a@a.com'
    })

    res.send(user);
})

app.get('/get-user/:username', async (req, res, next) => {
    const user = await userModel.findOne({
        username: req.params.username
    })
    res.send(user);
})

app.get('/create-post/:username', async (req, res, next) => {
    const chacha = await userModel.findOne({
        username: req.params.username
    })

    chacha.posts.push({
        content: "https://images.unsplash.com/photo-1721983571623-ed178f59d9b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
        caption: "This is a caption"
    })

    await chacha.save()

    res.send(chacha);

})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})