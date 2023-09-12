const { promisify } = require('util')

const redis = require('redis')
const { resolve } = require('path')
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
})

// accquire Lock
const accquireLock = async (key, expiredTime) => {
  const setnx = await promisify(client.setnx).bind(client)
  const pexpire = await promisify(client.pexpire).bind(client)

  const result = await setnx(key, '')
  if (result === 1) {
    // create a key successfully
    await pexpire(key, expiredTime)
    return new Promise((resolve) => resolve('You are using this product'))
  } else {
    return new Promise((_, reject) =>
      reject('There is other user who is using this product'),
    )
  }
}

// release lock
const releaseLock = async (key) => {
  const delKey = promisify(client.del).bind(client)
  return await delKey(key)
}

module.exports = { accquireLock, releaseLock }
