const express = require('express');
const app = express();
const connectToDb = require('./config/mongodb');
connectToDb();
const userModel = require('./models/user');
const postModel = require('./models/post');

app.get('/', (req, res, next) => {
    res.send('Hello World')
})

app.get('/create-user', async (req, res, next) => {
    const user = await userModel.create({
        username: "a",
        email: "a@a.com"
    })

    res.send(user)
})


app.get('/read-user', async (req, res, next) => {
    const users = await userModel.find({}).populate('posts')
    res.send(users)
})

app.get('/create-post/:username', async (req, res, next) => {
    const post = await postModel.create({
        content: "https://images.unsplash.com/photo-1721332150382-d4114ee27eff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D",
        caption: "Hello World"
    })

    const user = await userModel.findOne({ username: req.params.username })

    user.posts.push(post._id)

    await user.save()

    res.send(post)

})



app.listen(3000, () => {
    console.log('Server is running on port 3000')
})