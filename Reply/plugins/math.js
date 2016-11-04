var _ = require('lodash')
var mathjs = require('mathjs')

String.prototype.replaceAll = function(search, replacement) {
    var target = this
    return target.split(search).join(replacement)
}

const operators = [
  '+', '-', '/', '*',
  'plus', 'add', 'minus', 'subtract', 'divide', 'divded', 'multiply', 'multiplied', 'times'
]

const normalizeOperators = (msg) => {

  const plus = ['plus', 'add']
  const minus = ['minus', 'subtract']
  const multiply = ['multiply', 'multiplied', 'times']
  const divide = ['divide', 'divided']

  plus.forEach(operator => { msg = msg.replaceAll(operator, '+') })
  minus.forEach(operator => { msg = msg.replaceAll(operator, '-') })
  multiply.forEach(operator => { msg = msg.replaceAll(operator, '*') })
  divide.forEach(operator => { msg = msg.replaceAll(operator, '/') })

  return msg
}

const removeJunkChars = (message, msgObj) => {

  let junklessMessage = message.split(' ')
  junklessMessage = junklessMessage.filter(word => {
    if (operators.indexOf(word) > -1 || msgObj.numbers.indexOf(word) > -1) {
      return true
    } else {
      return false
    }
  })
  return junklessMessage
}

const math = (msgObj) => {
  return new Promise(resolve => {
    if (msgObj.reply) {
      resolve(msgObj)
    } else {
      // TODO improve this, by making sure the operator is inbetween the numbers.
      if (msgObj.numbers.length >= 2 && _.intersection(msgObj.cleanedMessage.split(' '), operators).length > 0) {
        let mathOperation = normalizeOperators(msgObj.cleanedMessage)
        mathOperation = removeJunkChars(mathOperation, msgObj)
        const result = mathjs.eval(mathOperation.join(' '))
        msgObj.reply = result
      }
      resolve(msgObj)
    }
  })
}

module.exports = math
