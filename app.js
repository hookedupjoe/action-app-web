var express = require('express');
var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });
 
app.use(express.static('www'));

var server = app.listen(process.env.PORT ||7071, function () {
    var host = server.address().address ;
    var port = server.address().port;
    console.log("Simply web server running on http://%s:%s", host, port)
});