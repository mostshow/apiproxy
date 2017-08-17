var express = require('express');
var app = express();


app.get('/', function(req, res){

	res.cookie('name', 'proxy', {maxAge:600000, httpOnly:true, path:'/'});
 	res.send('hello world');

});

app.listen(3011);