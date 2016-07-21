var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');


//router.use(express.static(__dirname + '/public'));

// router.get('/stylesheets/style.css',function(req,res){
// 	res.sendFile('/stylesheets/style.css');
// });

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', urlencodedParser, function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm:true,defaultName:name } );
});

router.get('/tweets/:id', function(req, res) {
  var id = Number(req.params.id);
  var name = req.params.name;
  var list = tweetBank.find( {id: id} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list,showForm:false } );
});

router.post('/tweets', urlencodedParser, function(req, res) {
  var name = req.body.name;
  var content = req.body.content;
  tweetBank.add(name, content);
  res.redirect('/');
});

module.exports = router;