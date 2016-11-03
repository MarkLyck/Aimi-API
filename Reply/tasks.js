var fallback = require('./plugins/fallback')
var math = require('./plugins/math')

const tasks = (msgObj) => {
  return new Promise(resolve => {
    math(msgObj)
    .then(msgObj => fallback(msgObj))
    .then(msgObj => {
      resolve(msgObj)
    })
  })
}

module.exports = tasks
