var moment = require('moment')

const timeParser = (msgObj) => {
  return new Promise(resolve => {
    if (msgObj.reply || !msgObj.isQuestion) {
      resolve(msgObj)
    } else if ( msgObj.cleanedMessage.indexOf('time') > -1
                && msgObj.qType === 'DESC:def'
                && msgObj.units.length === 0) {
      msgObj.reply = 'It is ' + moment().format('LT')
      resolve(msgObj)
    } else {
      resolve(msgObj)
    }
  })
}

module.exports = timeParser
