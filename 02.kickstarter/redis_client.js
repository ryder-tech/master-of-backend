'use strict'

const redis = require('redis')

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
})

async function psubscribeEvents() {
  // Subscribe to key events
  redisClient.psubscribe('__keyevent@*__:expired')

  // Listen for messages
  redisClient.on('pmessage', (pattern, channel, message) => {
    if (pattern === '__keyevent@*__:expired') {
      console.log(message)
    }
  })
}

module.exports = { psubscribeEvents }
