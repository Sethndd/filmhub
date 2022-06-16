const config = require('./app/config/config');
const mongoose = require('./app/config/mongoose');
const express = require('./app/config/express');
const path = require('path');

var db = mongoose();
var app = express();

app.set('port', config.PORT);

var routes = path.join(__dirname, './app/modules/users/routes/') 

app.use(require(path.join(routes, 'auth.server.routes.js')))
app.use(require(path.join(routes, 'index.server.routes.js')))
app.use(require(path.join(routes, 'users.server.routes.js')))
app.use(require(path.join(routes, 'paquetes.server.routes.js')))
app.use(require(path.join(routes, 'eventos.server.routes.js')))
app.use(require(path.join(routes, 'upload.server.routes.js')))

app.listen(app.get('port'), () => {
    console.log('Server listening port', app.get('port'))
});