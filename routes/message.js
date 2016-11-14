const express = require('express');
const router = express.Router();
const NLPtasks = require('../src/NLP/tasks')
const replyTasks = require('../src/Reply/tasks')
const dataTasks = require('../src/data/tasks')
const private = require('../private')

var mongoose = require('mongoose')
mongoose.connect('mongodb://' + private.mongoUser + ':' + private.mongoPW + '@ds153677.mlab.com:53677/aimi')

router.post('/', function(req, res, next) {
  NLPtasks(req.body.body)
  .then(dataTasks)
  .then(replyTasks)
  .then((response) => {
    console.log('sending response: ', response)
    res.send(response)
  })
  .catch((e) => console.log(e))
})

module.exports = router;
