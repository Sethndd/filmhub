var mongoose = require('mongoose');
var config = require('./config');

module.exports = function () {
    mongoose.Promise = global.Promise;
    db = mongoose.connect(config.dbUrl).then(function () {
        console.log('Connected to database successfully', config.dbUrl);
    }, function (err) {
        console.log(err)
        console.log('Database connection timeout error');
    });

    require('../modules/users/models/users.server.model');
    require('../modules/users/models/session.server.model');
    require('../modules/users/models/paquete.server.model');
    require('../modules/users/models/evento.server.model');

    return db;
}