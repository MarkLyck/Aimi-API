var fallback = require('./plugins/fallback')
var math = require('./plugins/math')
var counting = require('./plugins/counting')
var timeParser = require('./plugins/time')
var personalInfo = require('./plugins/personalInfo')

const tasks = (msgObj) => {
  return new Promise(resolve => {
    math(msgObj)
    .then(counting)
    .then(timeParser)
    .then(personalInfo)
    .then(fallback)
    .then(msgObj => {
      resolve(msgObj)
    })
  })
}

module.exports = tasks
