const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json({
        message: 'test'
    })
})

app.get('/hello-world', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

app.listen(4000, () => {
    console.log(`running at http://localhost:4000`)
})