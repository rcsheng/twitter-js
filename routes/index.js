var path = require('path');

module.exports = function(io)
{

var swig = require('swig');
swig.setDefaults({cache: false});

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

// router.get('/tweets', urlencodedParser, function (req, res) {
//   var tweets = tweetBank.list();
//   res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
// });

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
  var tweet = tweetBank.add(name, content);
  console.log("before swig: ");
  res.redirect('/');
  
  swig.renderFile(path.join(__dirname, '../views/_tweet.html'), {tweet: tweet }, function(err, result){
    if (err) {
      console.log(err);
    console.log(__dirname);
  }
    else{
    console.log("called io with: ", tweet);
    io.emit('newTweet', tweet);  
    }
    
  });

});

function sendTime() {
    io.emit('newTweet', { name: "Richard", content: "Hello World" , id: 555});
}

// Send current time every 10 secs
//setInterval(sendTime, 10000);

  //io.sockets.emit('newTweet', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm:true,defaultName:name });

  return router;
}