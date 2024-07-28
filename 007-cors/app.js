const express = require('express');
const app = express();
const ExpressSession = require('express-session');

const cors = require('cors');

app.use(ExpressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'hoooray!',
}))




app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/cors-route', cors(), (req, res, next) => {

})


app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`);
});