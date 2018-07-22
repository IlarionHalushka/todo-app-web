import express from 'express';

var router = express.Router();

router.get('/', function(req, res) {
  res.send('<h1> test application 1 </h1>');
})

module.exports = router;