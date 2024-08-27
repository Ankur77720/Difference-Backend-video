const express = require('express');
const app = express();
const connectToDb = require('./config/mongodb');
connectToDb();
const userModel = require('./models/users');
const postModel = require('./models/post');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/createUser', async (req, res) => {
    const user = await userModel.create({
        name: 'John',
        email: 'a@a.com'
    })
    res.send(user);
})

app.post('/createPost/:userEmail', async (req, res, next) => {

    const newPost = await postModel.create({
        caption: "Hello",
        content: "https://plus.unsplash.com/premium_photo-1717423160058-508ea6e11a50?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
    });

    const user = await userModel.findOne({ email: req.params.userEmail });

    user.posts.push(newPost._id);

    await user.save();

    res.send(user);

})


app.get('/get-user-data', async (req, res, next) => {
    const users = await userModel.findOne({
        email: 'a@a.com'
    }).populate('posts');

    res.send(users)

})


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});