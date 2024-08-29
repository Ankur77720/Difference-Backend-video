const express = require('express')
const http = require('http')
const SocketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new SocketIo.Server(server)

app.set('view engine', 'ejs')



io.on('connection', (socket) => {
    console.log('User connected')

    socket.on("message", (msg) => {
        io.emit("message", "hello from server")
    })

})


app.get('/', (req, res) => {
    res.render('index')
})


server.listen(3000, () => {
    console.log('Server is running on port 3000')
})