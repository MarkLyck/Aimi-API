var _ = require('lodash')
var mongoose = require('mongoose')
var User = require('../../data/models/User')

const countingTriggers = ['after', 'before', 'letter', 'letters', 'last', '1st', 'alphabet']
const countingWords = ['after', 'before', 'last', '1st']
const letterCountingWords = ['alphabet', 'letter', 'letters']

const counting = (msgObj) => {
  return new Promise(resolve => {
    if (msgObj.reply || !msgObj.isQuestion) {
      resolve(msgObj)
    } else if (msgObj.qType !== 'NUM:count' && msgObj.qType !== 'DESC:def') {
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
  if (  msgObj.cleanedMessage.indexOf('alphabet') > -1 && msgObj.numbers.length === 1
        && _.intersection(msgObj.cleanedMessage.split(' '), countingWords).length === 0) {
    if (msgObj.numbers[0] <= (alphabet.length + 1)) {
      const number = msgObj.numbers[0] - 1
      msgObj.reply = alphabet[number]
    }
  // Find first or last letter in alphabet
  } else if ( _.intersection(msgObj.cleanedMessage.split(' '), countingWords).length > 0
              && msgObj.cleanedMessage.indexOf('alphabet') > -1) {
    if (msgObj.cleanedMessage.indexOf('1st') > -1) {
      msgObj.reply = alphabet[0]
    } else if (msgObj.cleanedMessage.indexOf('last') > -1) {
      msgObj.reply = alphabet[alphabet.length - 1]
    }
    // TODO Handle after and before + number e.g. what comes after the 3rd letter in the alphabet?

  // Handle Amount of letters in alphabet
  } else if ( msgObj.isQuestion
              && msgObj.cleanedMessage.indexOf('alphabet') > -1
              && msgObj.cleanedMessage.indexOf('letters') > -1) {
    msgObj.reply = alphabet.length
  } else if (msgObj.cleanedMessage.indexOf('in') > -1 && msgObj.cleanedMessage.indexOf('letters') > -1) {
    const indexStartChecker = msgObj.cleanedMessage.split(' ').indexOf('in') + 1
    var wordToCount = msgObj.cleanedMessage.split(' ')[indexStartChecker]

    if (msgObj.nouns.length >= 2) {
      const possibleWords = msgObj.taggedWords.filter((word, i) => {
        if (i < indexStartChecker) {
          return false
        }
        if (word[1] === 'NN' || word[1] === 'NNS' || word[1] === 'NNP' || word[1] === 'NNPS') {
          return true
        } else {
          return false
        }
      })
      wordToCount = possibleWords[0][0]
    }
    if (wordToCount !== 'name') {
      msgObj.reply = wordToCount.length
    } else if (msgObj.names.length > 0) {
      msgObj.reply = msgObj.names[0].length
    } else {
      console.log('COUNT MY NAME');
      User.find({ username: private.userName }, (err, docs) => {
        console.log('FOUND USER: ', docs);
        msgObj.reply = docs
      })
    }
  }
  return msgObj
}

const numberCounting = (msgObj) => {
  if (msgObj.cleanedMessage.indexOf('after') > -1 && msgObj.numbers.length === 1) {
    msgObj.reply = msgObj.numbers[0] + 1
  } else if (msgObj.cleanedMessage.indexOf('before') > -1 && msgObj.numbers.length === 1) {
    msgObj.reply = msgObj.numbers[0] - 1
  }
  return msgObj
}

module.exports = counting
