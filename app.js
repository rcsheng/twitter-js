var express = require('express');
var app = express();

var mid = function (req, res, next) {
  req.returnString = req.method + " \\" + req.baseUrl; 
  next();
};

app.use(mid);

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.returnString + '</small>';
  res.send(responseText);
});

app.listen(3000);
console.log('server listening');