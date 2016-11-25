var fallback = require('./plugins/fallback')
var math = require('./plugins/math')
var counting = require('./plugins/counting')
var timeParser = require('./plugins/time')
var userInfo = require('./plugins/userInfo')
var botInfo = require('./plugins/botInfo')

const tasks = (msgObj) => {
  return new Promise(resolve => {
    math(msgObj)
    .then(counting)
    .then(timeParser)
    .then(userInfo)
    .then(botInfo)
    .then(fallback)
    .then(msgObj => {
      resolve(msgObj)
    })
  })
}

module.exports = tasks
