var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');


//router.use(express.static(__dirname + '/public'));

// router.get('/stylesheets/style.css',function(req,res){
// 	res.sendFile('/stylesheets/style.css');
// });

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

module.exports = router;