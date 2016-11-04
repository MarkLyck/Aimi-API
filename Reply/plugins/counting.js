var _ = require('lodash')

const countingTriggers = ['after', 'before', 'letter', 'letters', 'last', '1st', 'alphabet']
const countingWords = ['after', 'before', 'last', '1st']
const letterCountingWords = ['alphabet', 'letter', 'letters']

const counting = (msgObj) => {
  return new Promise(resolve => {
    if (msgObj.reply) {
      resolve(msgObj)
    } else if (
      _.intersection(msgObj.cleanedMessage.split(' '), countingTriggers).length === 0
      && msgObj.numbers.length === 0
      && msgObj.cleanedMessage.indexOf('alphabet') === -1) {
      resolve(msgObj)
    } else {
      if (_.intersection(msgObj.cleanedMessage.split(' '), letterCountingWords).length > 0) {
        resolve(letterCounting(msgObj))
      } else {
        resolve(numberCounting(msgObj))
      }
    }
  })
}

const letterCounting = (msgObj) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  // Find numbered letter in alphabet
  if (msgObj.cleanedMessage.indexOf('alphabet') > -1 && msgObj.numbers.length === 1
      && _.intersection(msgObj.cleanedMessage.split(' '), countingWords).length === 0) {
    if (msgObj.numbers[0] <= (alphabet.length + 1)) {
      const number = msgObj.numbers[0] - 1
      msgObj.reply = alphabet[number]
    }
  // Find first or last letter in alphabet
  } else if (_.intersection(msgObj.cleanedMessage.split(' '), countingWords).length > 0
            && msgObj.cleanedMessage.indexOf('alphabet') > -1) {
    if (msgObj.cleanedMessage.indexOf('1st') > -1) {
      msgObj.reply = alphabet[0]
    } else if (msgObj.cleanedMessage.indexOf('last') > -1) {
      msgObj.reply = alphabet[alphabet.length - 1]
    }
    // TODO Handle after and before + number e.g. what comes after the 3rd letter in the alphabet?
  } else if (msgObj.isQuestion
    && msgObj.cleanedMessage.indexOf('alphabet') > -1
    && msgObj.cleanedMessage.indexOf('letters') > -1) {
    msgObj.reply = alphabet.length
  }
  return msgObj
}

const numberCounting = (msgObj) => {
  return msgObj
}

module.exports = counting
