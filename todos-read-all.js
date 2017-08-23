'use strict'

const dynamoDb = require('serverless-dynamodb-client')

const docClient = dynamoDb.doc

module.exports = (event, callback) => {
  const params = {
    TableName: 'todos',
  }

  return docClient.scan(params, (error, data) => {
    if (error) {
      callback(error)
    }
    callback(error, data && data.Items)
  })
}
