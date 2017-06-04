'use strict'

const todosCreate = require('./todos-create.js')
const todosReadAll = require('./todos-read-all.js')
const todosReadOne = require('./todos-read-one.js')
const todosUpdate = require('./todos-update.js')
const todosDelete = require('./todos-delete.js')
const todosDeleteAll = require('./todos-delete-all.js')

function createResponse(result) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(result),
  }
}

module.exports.create = (event, context, callback) => {
  todosCreate(event, (error, result) => {
    callback(error, createResponse(result))
  })
}

module.exports.readAll = (event, context, callback) => {
  todosReadAll(event, (error, result) => {
    callback(error, createResponse(result))
  })
}

module.exports.readOne = (event, context, callback) => {
  todosReadOne(event, (error, result) => {
    callback(error, createResponse(result))
  })
}

module.exports.update = (event, context, callback) => {
  todosUpdate(event, (error, result) => {
    callback(error, createResponse(result))
  })
}

module.exports.delete = (event, context, callback) => {
  todosDelete(event, (error, result) => {
    callback(error, createResponse(result))
  })
}

module.exports.deleteAll = (event, context, callback) => {
  todosDeleteAll(event, (error, result) => {
    callback(error, createResponse(result))
  })
}
