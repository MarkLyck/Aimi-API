var normalizer = require('chatbot-normalizer')
var questionInfo = require('./questionInfo')
var speechTagger = require('./speechTagger')

function tasks(message) {
  return new Promise((resolve, reject) => {
    normalizer(message)
    .then(cleanMessage => questionInfo(cleanMessage))
    .then(msgObj => speechTagger(msgObj))
    .then(msgObj => {
      console.log(msgObj)
      resolve(msgObj)
    })
  })
}

module.exports = tasks
