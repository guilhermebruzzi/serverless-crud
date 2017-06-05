'use strict'

const redis = require('redis')
const CachemanRedis = require('cacheman-redis')
const dynamoDb = require('serverless-dynamodb-client')

const docClient = dynamoDb.doc

function getRedisClient() {
  const host = process.env.REDIS_HOST || 'localhost'
  const port = parseInt(process.env.REDIS_PORT || '6379', 10)
  return redis.createClient({ host, port })
}

const redisClient = getRedisClient()
const cache = new CachemanRedis(redisClient)

const TIMEOUT = 30 // time in seconds for cache

module.exports = (event, callback) => {
  const params = {
    TableName: 'todos',
  }

  cache.get('dataItems', (error, result) => {
    console.log('redis result', result)
    if (result) {
      console.log('redis result 2', result)
      callback(error, result)
      return
    }

    docClient.scan(params, (error, data) => {
      if (error) {
        callback(error)
      }
      console.log('redis result 3', data)
      if (data && data.Items && data.Items.length > 0) {
        cache.set('dataItems', data.Items, TIMEOUT, function(error) {
          if (error) {
            console.error('Error on data cache set')
          }
        })
      }
      callback(error, data && data.Items)
    })
  })
}
