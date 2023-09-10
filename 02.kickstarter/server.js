'use strict'

const express = require('express')
const { psubscribeEvents } = require('./redis_client')

const port = 5002
const app = express()

psubscribeEvents().catch((err) => {
  console.log('There are some errors', err)
})

const server = app.listen(port, () => {
  console.log(`Start server with port ${port}`)
})
