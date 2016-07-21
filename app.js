var express = require('express');
var swig = require('swig');
var app = express();


var socketio = require('socket.io');

var routes = require('./routes/');
app.use('/', routes);
app.use(express.static(__dirname + '/public'));

app.engine('html', swig.renderFile);
app.set('view engine','html');
app.set('views', __dirname + '/views');
app.set('view cache',false);
swig.setDefaults({cache: false});

// var locals = {
//     title: 'An Example',
//     people: [
//         { name: 'Gandalf'},
//         { name: 'Frodo' },
//         { name: 'Hermione'}
//     ]
// };
// swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
//     console.log(output);
// });
// var mid = function (req, res, next) {
//   req.returnString = req.method + " \\" + req.baseUrl; 
//   next();
// };

// app.use(mid);

// app.get('/', function (req, res) {
//   // var responseText = 'Hello World!<br>';
//   // responseText += '<small>Requested at: ' + req.returnString + '</small>';
//   // res.send(responseText);
//   res.render('index', locals);
// });

var server = app.listen(3000);
var io = socketio.listen(server);
console.log('server listening');