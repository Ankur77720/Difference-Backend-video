const fs = require('fs')

// fs.writeFile("hello.txt", "hello from node.js", (err) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log("file created")
//     }
// })

// fs.readFile("hello.txt", 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log(data)
//     }
// })

// fs.writeFile('hello.txt', 'welcome to node.js', (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('file updated')
//     }
// })

// fs.appendFile('hello.txt', "hello from node.js", (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('file updated')
//     }
// })

// fs.unlink('hello.txt', (err) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log('file deleted')
//     }
// })

// fs.mkdir("sampleFolder", (err) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log('folder created')
//     }
// })


// fs.readdir('sampleFolder', (err, files) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log(files)
//     }
// })

fs.rmdir('sampleFolder', {
    recursive: true
}, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('folder deleted')
    }
})
