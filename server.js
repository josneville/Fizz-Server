var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var printJSON = require('./routes/printJSON');
var http = require('http');
var path = require('path');
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/orders', {native_parser:true});

var app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.favicon())
app.use(express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/demoQueue', routes.demoQueue);
app.get('/printJSON', printJSON.userlist(db));
app.post('/addUser', user.adduser(db));
app.delete('/deleteUser/:id', user.deleteuser(db));

http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});
