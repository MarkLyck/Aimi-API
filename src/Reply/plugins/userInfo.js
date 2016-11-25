var mongoose = require('mongoose')

var User = require('../../data/models/User')
const private = require('../../../private')
// var User = mongoose.model('User', UserSchema);



// const user = User.find({})

// console.log('finding user: ', User.find({}))
//
const bot = {
  name: 'Aimi'
}

const userInfo = (msgObj) => {
  return new Promise(resolve => {
    if (msgObj.reply || !msgObj.isQuestion) {
      resolve(msgObj)
    } else if (msgObj.pronouns.indexOf('my') > -1 || msgObj.pronouns.indexOf('me') > -1) {
      User.find({ userName: private.userName }, (err, user) => {
        user = user[0]
        console.log('FOUND USER: ', err, user)
        if (msgObj.nouns.indexOf('name') > -1) {
          msgObj.reply = 'Your name is ' + user.name
        }
        resolve(msgObj)
      })

    } else {
      resolve(msgObj)
    }
  })
}

module.exports = userInfo
