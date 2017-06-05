'use strict'

const dynamoDb = require('serverless-dynamodb-client')
const uuid = require('uuid')

const docClient = dynamoDb.doc

module.exports = (event, callback) => {
  const data = JSON.parse(event.body)

  data.id = uuid.v1()
  data.createdAt = new Date().getTime()
  data.updatedAt = new Date().getTime()

  const params = {
    TableName: 'todos',
    Item: data,
  }

  return docClient.put(params, (error) => {
    if (error) {
      callback(error)
    }
    callback(error, params.Item)
  })
}
