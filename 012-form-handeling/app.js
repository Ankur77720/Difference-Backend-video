const express = require('express');
const app = express();
const ExpressSession = require('express-session');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ExpressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'hoooray!',
}))



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/check', (req, res, next) => {

    console.log(req.query)

    res.send('Check')
})

app.post('/check', (req, res, next) => {
    console.log("this is post route")
    console.log(req.body)
    res.send('Check')
})


app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`);
});