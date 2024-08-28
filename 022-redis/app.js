const express = require('express');
const app = express();
const Redis = require('ioredis');


/* redis-16318.c212.ap-south-1-1.ec2.redns.redis-cloud.com:16318 */

const redisClient = new Redis({
    host: "redis-16318.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 16318,
    password: "99oa52kE6PbbRk1aDN34iI41nvwtRaLc"
})

redisClient.on('connect', () => {
    console.log('Redis Connected')
})


function getData() {
    console.time('getData')
    let sum = 0
    for (let i = 0; i < 1000000000 * 5; i++) {
        sum += i
    }
    console.timeEnd('getData')
    return sum
}


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/data', async (req, res, next) => {
    const cachedData = await redisClient.get("chacha")

    if (cachedData) {
        return res.send(`Data: ${cachedData}`)
    }

    const data = getData()
    await redisClient.set("chacha", data, "EX", 30)
    res.send(`Data: ${data}`)
})


app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`);
});