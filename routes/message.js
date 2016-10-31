var express = require('express');
var router = express.Router();
var NLP = require('../NLP/NLP')

router.post('/', function(req, res, next) {
  // console.log(req.body)
  NLP(req.body.body)
  .then((response) => {
    console.log('sending response: ', response)
    res.send(response)
  })
  .catch((e) => console.log(e))
})

module.exports = router;
