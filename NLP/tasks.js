var normalizer = require('chatbot-normalizer')
var questionInfo = require('./plugins/questionInfo')
var speechTagger = require('./plugins/speechTagger')
var isCommand = require('./plugins/isCommand')

function tasks(message) {
  return new Promise((resolve, reject) => {
    normalizer(message)
    .then(cleanMessage => questionInfo(cleanMessage))
    .then(msgObj => speechTagger(msgObj))
    .then(msgObj => isCommand(msgObj))
    .then(msgObj => {
      console.log(msgObj)
      resolve(msgObj)
    })
  })
}

module.exports = tasks
