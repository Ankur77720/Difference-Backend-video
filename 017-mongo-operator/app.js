const express = require('express');
const app = express();
const connectToDb = require('./config/mongoose');
connectToDb();
const userModel = require('./models/users');
const sampleUsers = require('./sampleUserData');

app.get('/', (req, res, next) => {
    res.send('Hello World');
})

app.get('/insert-users', async (req, res, next) => {
    const users = await userModel.insertMany(sampleUsers)
    res.send(users);
})

app.get('/get-users', async (req, res, next) => {
    /* 
    or
     */

    const users = await userModel.aggregate([
        {
            $sample: {
                size: 2
            }
        }
    ])


    res.send(users);
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})