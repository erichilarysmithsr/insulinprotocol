var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/check', function(req, res, next) {
  res.send('Test routed');
});

module.exports = router;
