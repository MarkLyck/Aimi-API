var fallback = require('./plugins/fallback')
var math = require('./plugins/math')
var counting = require('./plugins/counting')
var timeParser = require('./plugins/time')

const tasks = (msgObj) => {
  return new Promise(resolve => {
    math(msgObj)
    .then(msgObj => counting(msgObj))
    .then(msgObj => timeParser(msgObj))
    .then(msgObj => fallback(msgObj))
    .then(msgObj => {
      resolve(msgObj)
    })
  })
}

module.exports = tasks
