var fallback = require('./plugins/fallback')

const tasks = (msgObj) => {
  return new Promise(resolve => {
    fallback(msgObj)
    .then(msgObj => {
      resolve(msgObj)
    })
  })
}

module.exports = tasks
