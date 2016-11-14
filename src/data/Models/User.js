var mongoose = require('mongoose')

var User = mongoose.model('User', {
  userName: String,
  messages: Array,
  name: String
})

// This creates a user
// var user = new User({ userName: private.userName })
// user.save((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('user created')
//   }
// })

module.exports = User
