const redis = require('redis')
const redisClient = redis.createClient({
  // host: '127.0.0.1',
  // port: 6379
})

const MAX_REQUEST = 5 // maximum number of request allowed
const RATE_LIMITING_TIME_MS = 1 * 60 * 1000 // 1 minute

const rateLimiting = (req, res, next) => {
  const path = req.url

  if (path !== '/login') {
    next()
    return
  }

  const ip = req.ip

  redisClient.incr(ip, (error, currentCount) => {
    if (error) {
      console.log('We cannot increment Redis key')
      return res.status(500).json({ error: 'Internal server error' })
    }

    // if this is the first time
    if (currentCount === 1) {
      redisClient.expire(ip, RATE_LIMITING_TIME_MS / 1000) // convert to seconds
    }

    // if current cout exeed maximum => display an error
    if (currentCount > MAX_REQUEST) {
      console.log('Rate limit exceeded')
      return res.status(429).json({ error: 'Rate limit exceeded' })
    }

    next()
  })
}

module.exports = rateLimiting
