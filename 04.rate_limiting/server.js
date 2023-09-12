const express = require('express')
const rateLimiting = require('./rate_limiting_middleware')
const send = require('send')

const port = 3000

const app = express()
// rate limiting middleware
app.use(rateLimiting)

app.get('/login', (req, res) => {
  console.log('You are accessing to login API')
  res.send({})
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})
