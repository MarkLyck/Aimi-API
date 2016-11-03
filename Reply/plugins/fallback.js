

const fallback = (msgObj) => {
  return new Promise(resolve => {
    console.log('reply in fallback' , msgObj.reply)
    if (msgObj.reply) {
      resolve(msgObj)
    } else {
      msgObj.reply = 'I don\'t understand'
      resolve(msgObj)
    }
  })
}

module.exports = fallback
