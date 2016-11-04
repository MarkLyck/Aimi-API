const commandTriggers = ['set the', 'set a', 'set a']


function isCommand(msgObj) {
  return new Promise(resolve => {
    const commandMessage = msgObj.cleanedMessage.toLowerCase().replace('could you', '')
    if (commandMessage.indexOf('set') === 0) {
      msgObj.isCommand = true
    }
    resolve(msgObj)
  })
}

module.exports = isCommand
