var express = require('express');
var router = express.Router();
var NLP = require('../NLP/NLP')

router.post('/', function(req, res, next) {
  // console.log(req.body)
  NLP(req.body)
  res.send(req.body)
})

module.exports = router;
