const express = require('express');
const app = express();
const connectToDb = require('./config/mongoose');
connectToDb();
const userModel = require('./models/users');
const sampleUsers = require('./sampleUserData');

app.get('/', (req, res, next) => {
    res.send('Hello World');
});

app.get('/insert-users', async (req, res, next) => {
    const users = await userModel.insertMany(sampleUsers);
    res.send(users);
});

app.get('/get-users', async (req, res, next) => {
    const users = await userModel.aggregate([
        {
            $sample: {
                size: 2
            }
        }
    ]);
    res.send(users);
});

// Example routes for each operator

// $lt
app.get('/users-age-lt', async (req, res, next) => {
    const users = await userModel.find({ age: { $lt: 30 } });
    res.send(users);
});

// $lte
app.get('/users-age-lte', async (req, res, next) => {
    const users = await userModel.find({ age: { $lte: 30 } });
    res.send(users);
});

// $gt
app.get('/users-age-gt', async (req, res, next) => {
    const users = await userModel.find({ age: { $gt: 30 } });
    res.send(users);
});

// $gte
app.get('/users-age-gte', async (req, res, next) => {
    const users = await userModel.find({ age: { $gte: 30 } });
    res.send(users);
});

// $in
app.get('/users-age-in', async (req, res, next) => {
    const users = await userModel.find({ age: { $in: [ 25, 30, 35 ] } });
    res.send(users);
});

// $nin
app.get('/users-age-nin', async (req, res, next) => {
    const users = await userModel.find({ age: { $nin: [ 25, 30, 35 ] } });
    res.send(users);
});

// $exists
app.get('/users-email-exists', async (req, res, next) => {
    const users = await userModel.find({ email: { $exists: true } });
    res.send(users);
});

// $or
app.get('/users-age-or', async (req, res, next) => {
    const users = await userModel.find({ $or: [ { age: 25 }, { age: 30 } ] });
    res.send(users);
});

// $sample
app.get('/users-sample', async (req, res, next) => {
    const users = await userModel.aggregate([ { $sample: { size: 2 } } ]);
    res.send(users);
});

// $limit
app.get('/users-limit', async (req, res, next) => {
    const users = await userModel.find().limit(2);
    res.send(users);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});