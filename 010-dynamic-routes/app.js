const express = require('express');
const app = express();
const ExpressSession = require('express-session');


app.use(ExpressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'hoooray!',
}))


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/profile/:username', (req, res, next) => {
    const username = req.params.username
    res.send(`${username}'s Profile page`)
})

app.get('/profile/:username/:age', (req, res, next) => {
    const username = req.params.username
    const age = req.params.age

    res.send(`${username}'s Profile page, ${age} years old`)
})


app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`);
});