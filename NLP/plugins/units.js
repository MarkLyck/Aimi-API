const units = [
  'miliseconds',
  'seconds',
  'minutes',
  'hours',
  'days',
  'months',
  'years',

  'degrees',
  'celcius',
  'fahrenheit',
  'kelvin',


  'letters',
]


function tagUnits(msgObj) {
  return new Promise(resolve => {
    resolve(msgObj)
  })
}

module.exports = tagUnits
