const express = require('express')
const app = express()
require('dotenv').config()

app.get('/hello-world', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
})