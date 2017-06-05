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

  return docClient.delete(params, (error) => {
    if (error) {
      callback(error)
    }
    callback(error, params.Key)
  })
}
