

const fallback = (msgObj) => {
  return new Promise(resolve => {
    if (msgObj.reply) {
      resolve(msgObj)
    } else if (msgObj.isQuestion) {
      msgObj.reply = 'I don\'t know'
    } else {
      msgObj.reply = 'I don\'t understand'
    }
    resolve(msgObj)
  })
}

module.exports = fallback
