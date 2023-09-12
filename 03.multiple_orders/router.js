const express = require('express')
const { accquireLock, releaseLock } = require('./redis_service')
const { error } = require('console')
const { SlowBuffer } = require('buffer')
const { resolve } = require('path')

const router = express.Router()

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

router.post('/products/:id/order', async (req, res) => {
  // accquire lock
  const key = 'product_01'
  await accquireLock(key, 10000)
    .then(async (data) => {
      console.log(data)

      // create an order: 3s
      await sleep(3000)

      releaseLock(key)
    })
    .catch((error) => console.log(error))
  res.send({ message: '' })
})

module.exports = router
