var clean = require('./clean')

function NLP(message) {
  return new Promise((resolve, reject) => {
      resolve(clean(message))
  })
}

module.exports = NLP
