'use strict'

const dynamoDb = require('serverless-dynamodb-client')

const docClient = dynamoDb.doc

module.exports = (event, callback) => {
  const params = {
    TableName: 'todos',
    Key: {
      id: event.pathParameters.id,
    },
  }

  return docClient.get(params, (error, data) => {
    if (error) {
      callback(error)
    }
    callback(error, data.Item)
  })
}
