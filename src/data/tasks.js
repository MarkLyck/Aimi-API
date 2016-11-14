const name = require('./plugins/name')

const tasks = (msgObj, db) => {
  return new Promise(resolve => {
    name(msgObj, db)
    .then(msgObj => {
      resolve(msgObj)
    })
  })
}

module.exports = tasks
