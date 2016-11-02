var express = require('express');
var router = express.Router();
var tasks = require('../NLP/tasks')

router.post('/', function(req, res, next) {
  // console.log(req.body)
  tasks(req.body.body)
  .then((response) => {
    console.log('sending response: ', response)
    res.send(response)
  })
  .catch((e) => console.log(e))
})

module.exports = router;
