var express = require('express');
var router = express.Router();
var NLPtasks = require('../NLP/tasks')
var replyTasks = require('../Reply/tasks')

router.post('/', function(req, res, next) {
  // console.log(req.body)
  NLPtasks(req.body.body)
  .then((msgObj) => replyTasks(msgObj))
  .then((response) => {
    console.log('sending response: ', response)
    res.send(response)
  })
  .catch((e) => console.log(e))
})

module.exports = router;
