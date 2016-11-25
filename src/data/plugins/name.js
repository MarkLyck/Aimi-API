var mongoose = require('mongoose')

var User = require('../models/User')
var private = require('../../../private')

const name = (msgObj) => {
  return new Promise(resolve => {
    if (msgObj.isQuestion) {
      resolve(msgObj)
    } else {
      const myIndex = msgObj.cleanedMessage.toLowerCase().split(' ').indexOf('my')
      if (myIndex > -1 && msgObj.cleanedMessage.toLowerCase().split(' ')[myIndex + 1] === 'name') {
        User.update({ username: private.username }, { name: msgObj.names[0] }, (err, raw) => {
          resolve(msgObj)
        })
      }
    }
    resolve(msgObj)
  })
}

module.exports = name
