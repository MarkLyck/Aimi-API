var normalizer = require('chatbot-normalizer')

function NLP(message) {
  return new Promise((resolve, reject) => {
    normalizer(message)
    .then((output) => {
      resolve(output)
    })
  })
}

module.exports = NLP
