var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'partials/init', nomenu: true });
});

/* GET home page. 
router.get('/register', function(req, res, next) {
  res.render('index', { page: 'partials/register' });
}); */

module.exports = router;
