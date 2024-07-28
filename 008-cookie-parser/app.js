const express = require('express');
const app = express();
const ExpressSession = require('express-session');
const cookieParser = require('cookie-parser');

app.use(ExpressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'hoooray!',
}))

app.use(cookieParser());


app.get('/', (req, res) => {
    res.cookie("token", "12345",)
    res.send('Hello World')
})

app.get('/check-cookie', (req, res, next) => {
    const cookieValue = req.cookies.token;
    res.send(cookieValue);
})


app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`);
});