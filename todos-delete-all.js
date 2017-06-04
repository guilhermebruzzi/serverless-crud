'use strict'

const todosReadAll = require('./todos-read-all.js')
const todosDelete = require('./todos-delete.js')

module.exports = (event, callback) => {
  todosReadAll(event, (error, result) => {
    if (error) {
      callback(error)
    }

    const todosTotal = result.length
    let todosDeleteCount = 0

    result.forEach((todoItem) => {
      const deleteEvent = {
        pathParameters: {
          id: todoItem.id,
        },
      }

      todosDelete(deleteEvent, (error) => {
        if (error) {
          callback(error)
        }

        todosDeleteCount++

        if (todosDeleteCount >= todosTotal) {
          callback(error, {
            deleted: todosDeleteCount,
          })
        }
      })
    })
  })
}
