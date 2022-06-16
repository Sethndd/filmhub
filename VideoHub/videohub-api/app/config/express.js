var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors')

module.exports = function(){
    
    var app = express();

    app.use(cors())

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token");
        res.header("Access-Control-Allow-Methods","PUT, GET, POST, OPTIONS, DELETE");
        next();
    });

    app.use('/files', express.static(path.join(__dirname, '../uploads')));

    app.use(bodyParser.urlencoded({
        extended:true
    }));
    app.use(bodyParser.json());

    return app;
}
