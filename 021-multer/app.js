const express = require('express');
const app = express();
const path = require('path');
const upload = require('./config/multer')

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/upload', upload.single('image'), (req, res, next) => {
    console.log(req.body)

    res.send('File uploaded successfully')
})


app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`);
});