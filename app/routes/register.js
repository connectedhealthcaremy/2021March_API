'use strict';

module.exports = function(app) {
// Home route
var register = require('../../app/controllers/register');
app.post('/registration', register.adduser);

};

