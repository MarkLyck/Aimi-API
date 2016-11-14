var _ = require('lodash')

var months = [
  'January',
  'Februrary',
  'Marts',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function dateTime(msgObj) {
  return new Promise(resolve => {
    msgObj.dates = []
    msgObj.times = []
    if (_.intersection(msgObj.cleanedMessage.split(' '), months).length > 0) {
      // Contains a date.
    }
    if (msgObj.cleanedMessage.split('').indexOf(':') > -1) {
      // Most likely contains a time.
      var messageWithTime = msgObj.cleanedMessage.replace(':', ' : ')
      var colonIndex = messageWithTime.split(' ').indexOf(':')
      if (!isNaN(Number(messageWithTime.split(' ')[colonIndex - 1]))
          && !isNaN(Number(messageWithTime.split(' ')[colonIndex + 1]))) {
        // Time found
        if (messageWithTime.toLowerCase().indexOf('am') > -1) {
          let time1 = messageWithTime.split(' ')[colonIndex - 1]
          const time2 = messageWithTime.split(' ')[colonIndex + 1]
          if (Number(messageWithTime.split(' ')[colonIndex - 1]) <= 9) {
              time1 = '0' + time1
          }
          msgObj.times.push(time1 + ':' + time2)
        } else if (messageWithTime.toLowerCase().indexOf('pm') > -1) {
          const time1 = Number(messageWithTime.split(' ')[colonIndex - 1]) + 12
          const time2 = messageWithTime.split(' ')[colonIndex + 1]
          msgObj.times.push(time1 + ':' + time2)
        } else {
          const time1 = messageWithTime.split(' ')[colonIndex - 1]
          const time2 = messageWithTime.split(' ')[colonIndex + 1]
          msgObj.times.push(time1 + ':' + time2)
        }
      }
    }
    resolve(msgObj)
  })
}

module.exports = dateTime
