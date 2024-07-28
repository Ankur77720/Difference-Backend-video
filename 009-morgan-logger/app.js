const express = require('express');
const app = express();
const ExpressSession = require('express-session');
const morgan = require('morgan');


app.use(morgan('dev'));

app.use(ExpressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'hoooray!',
}))


app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`);
});