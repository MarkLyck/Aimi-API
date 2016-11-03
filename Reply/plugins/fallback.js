

const fallback = (msgObj) => {
  return new Promise(resolve => {
    if (msgObj.reply)
      resolve(msgObj)

    msgObj.reply = 'I don\'t understand'
    resolve(msgObj)
  })
}

module.exports = fallback
