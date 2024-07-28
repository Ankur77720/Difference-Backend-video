const express = require('express');
const app = express();
const expressSession = require('express-session');


app.use(expressSession({
    secret: "Bahut secret hai",
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req, res) => {
    req.session.name = "Amit";
    res.send("Hello World");
})

app.get('/check', (req, res, next) => {
    console.log(req.session.name);
    res.send("Check");
})


app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
})