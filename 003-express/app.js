const express = require('express')
const app = express()

app.get("/", (req, res, next) => {
    console.log("This is home page middleWare")
    next()
}, (req, res, next) => {
    res.send("This is home page")
})

app.get('/profile', (req, res, next) => {
    res.send("This is profile page")
})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})