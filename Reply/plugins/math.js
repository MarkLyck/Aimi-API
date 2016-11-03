var _ = require('lodash')

const math = (msgObj) => {
  return new Promise(resolve => {
    console.log('MATH');
    if (msgObj.reply)
      resolve(msgObj)

    const operators = [
      '+', '-', '/', '*',
      'plus', 'minus', 'divide', 'divded', 'multiply', 'multiplied'
    ]
    console.log('OPERATORS: ', _.intersection(msgObj.cleanedMessage.split(' '), operators).length)
    console.log('NUMBERS: ', msgObj.numbers);
    if (msgObj.numbers.length >= 2 && _.intersection(msgObj.cleanedMessage.split(' '), operators).length > 0) {
      console.log('MATH OPERATION!!!');
      msgObj.reply = 'Math operation'
    }
    resolve(msgObj)
  })
}

module.exports = math
