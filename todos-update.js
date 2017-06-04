'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports = (event, callback) => {
  const data = JSON.parse(event.body)

  const params = {
    TableName: 'todos',
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: 'set updatedAt = :updatedAt, #name=:name',
    ExpressionAttributeNames: {
      '#name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':updatedAt': new Date().getTime(),
    },
    ReturnValues: 'UPDATED_NEW',
  }

  return dynamoDb.update(params, (error, data) => {
    if (error) {
      callback(error)
    }
    callback(error, data)
  })
}
