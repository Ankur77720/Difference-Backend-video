const express = require('express');
const app = express();


app.get('/', (req, res, next) => {
    try {
        res.send(hey);
    } catch (err) {
        console.log(err);
        next(err);
    }

})


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something went wrong');
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})