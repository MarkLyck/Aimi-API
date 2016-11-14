var normalizer = require('chatbot-normalizer')
var questionInfo = require('./plugins/questionInfo')
var speechTagger = require('./plugins/speechTagger')
var isCommand = require('./plugins/isCommand')
var tagUnits = require('./plugins/units')
var dateTime = require('./plugins/datetime')

function tasks(message, db) {
  return new Promise((resolve, reject) => {
    normalizer(message)
    .then(questionInfo)
    .then(speechTagger)
    .then(tagUnits)
    .then(dateTime)
    .then(isCommand)
    .then(msgObj => {
      resolve(msgObj, db)
    })
  })
}

module.exports = tasks
