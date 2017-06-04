'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports = (event, callback) => {
  const data = JSON.parse(event.body)

  data.id = event.pathParameters.id
  data.updatedAt = new Date().getTime()

  const params = {
    TableName: 'todos',
    Item: data,
  }

  return dynamoDb.put(params, (error) => {
    if (error) {
      callback(error)
    }
    callback(error, params.Item)
  })
}
