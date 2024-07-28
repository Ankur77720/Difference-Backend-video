const express = require('express');
const app = express();
const ExpressSession = require('express-session');


app.set('view engine', 'ejs');
app.use(ExpressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'hoooray!',
}))


app.get('/', (req, res) => {
    res.render('index', {
        name: "Sarthak sharma"
    })
})


app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`);
});