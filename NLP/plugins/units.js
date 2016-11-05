var _ = require('lodash')

const units = [
  'miliseconds',
  'seconds',
  'minutes',
  'hours',
  'days',
  'months',
  'years',
  'decades',
  'centimeters',
  'milimeters',
  'meters',
  'kilometers',
  'degrees',
  'celcius',
  'fahrenheit',
  'kelvin',
  'letters',
]


function tagUnits(msgObj) {
  return new Promise(resolve => {
    if (_.intersection(msgObj.cleanedMessage.split(' '), units).length > 0) {
      let unitsFound = []
      msgObj.cleanedMessage.split(' ').forEach(word => {
        const unitIndex = units.indexOf(word)
        if (unitIndex > -1) {
          unitsFound.push(units[unitIndex])
        }
      })
      msgObj.units = unitsFound
    }
    resolve(msgObj)
  })
}

module.exports = tagUnits
