const express = require('express')
const router = require('./router')

const port = 5001
const app = express()

// router
app.use('/', router)
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
