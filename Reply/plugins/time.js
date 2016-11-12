var moment = require('moment')
var _ = require('lodash')

const timeUnits = [
  'miliseconds',
  'seconds',
  'minutes',
  'hours',
  'days',
  'months',
  'years',
  'decades'
]

const dateMathWords = [ 'in', 'ago' ]
const addingDateWords = ['in', 'later']
const subtractingDateWords = ['ago', 'earlier']

const fixTime = (time) => {
  let hours = Number(time.split(':')[0])
  let minutes = Number(time.split(':')[1])

  while (minutes > 60) {
    hours++
    minutes -= 60
  }
  while (minutes < 0) {
    hours--
    minutes += 60
  }

  while (hours > 24) {  hours = hours - 24 }
  while (hours < 0) {  hours = hours + 24 }

  if (hours <= 9) { hours = '0' + hours }
  if (minutes <= 9) { minutes = '0' + minutes }
  return hours + ':' + minutes
}

const timeParser = (msgObj) => {
  return new Promise(resolve => {
    if (msgObj.reply || !msgObj.isQuestion) {
      resolve(msgObj)
    } else if ( msgObj.cleanedMessage.indexOf('time') > -1
                && msgObj.qType === 'DESC:def'
                && msgObj.units.length === 0) {
      msgObj.reply = 'It is ' + moment().format('LT')
    } else if ( _.intersection(msgObj.units, timeUnits).length
                && msgObj.times.length
                && msgObj.numbers.length
                && _.intersection(msgObj.cleanedMessage.split(' '), dateMathWords).length) {
      // Time math
      let newTime = msgObj.times[0]
      if (msgObj.units.indexOf('minutes') > -1) {
        if (_.intersection(msgObj.cleanedMessage.split(' '), addingDateWords).length) {
          newTime = newTime.split(':')[0] + ':' + (Number(newTime.split(':')[1]) + msgObj.numbers[0])
        } else if (_.intersection(msgObj.cleanedMessage.split(' '), subtractingDateWords).length) {
          newTime = newTime.split(':')[0] + ':' + (Number(newTime.split(':')[1]) - msgObj.numbers[0])
        }
        newTime = fixTime(newTime)
        msgObj.reply = `It would be ${newTime}`
      }
    }
    resolve(msgObj)
  })
}

module.exports = timeParser
