const express = require('express');
const app = express();
const connectToDb = require('./config/mongodb');
connectToDb();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const userModel = require('./models/users')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new userModel({
        username,
        email,
        password: hash
    })

    await user.save()

    const token = jwt.sign({
        username: user.username,
        email: user.email
    }, "secret")

    res.cookie("token", token)

    res.send(user)

})

app.get('/logout', (req, res, next) => {
    res.cookie("token", "")
    res.send("Logged out")
})

app.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).send("User not found")
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (isValidPassword) {
        const token = jwt.sign({
            username: user.username,
            email: user.email
        }, "secret")


        res.cookie("token", token)

        res.send("Logged in")

    } else {
        res.status(400).send("Invalid Password")
    }



})

function isLoggedIn(req, res, next) {
    try {


        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("Not authorized")
        }

        const decoded = jwt.verify(token, "secret")

        if (!decoded) {
            return res.status(401).send("Not authorized")
        }

        req.user = decoded;

        return next();
    } catch (err) {
        return res.status(401).send("Not authorized")
    }
}

app.get('/protected', isLoggedIn, (req, res, next) => {
    res.send("Protected route")
})

app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`);
});