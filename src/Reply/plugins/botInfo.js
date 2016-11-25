const bot = {
  name: 'Aimi'
}

const botInfo = (msgObj) => {
  return new Promise(resolve => {
    if (msgObj.reply || !msgObj.isQuestion) {
      resolve(msgObj)
    } else if (msgObj.pronouns.indexOf('you') > -1 || msgObj.pronouns.indexOf('your') > -1) {
      if (msgObj.nouns.indexOf('name') > -1) {
        msgObj.reply = `My name is ${bot.name}`
      }
      resolve(msgObj)
    } else {
      resolve(msgObj)
    }
  })
}

module.exports = botInfo
