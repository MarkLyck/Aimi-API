var normalizer = require('chatbot-normalizer')
var questionInfo = require('./questionInfo')

function NLP(message) {
  return new Promise((resolve, reject) => {
    normalizer(message)
    .then(output => questionInfo(output))
    .then(output => {
      console.log(output)
      resolve(output)
    })
  })
}

module.exports = NLP
