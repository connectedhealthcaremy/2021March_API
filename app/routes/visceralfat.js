 'use strict';

module.exports = function(app) {
// Visceral Fat route
var visceral = require('../../app/controllers/visceralfat');
app.post('/AddVisceralFat', visceral.addvisceralfat);
app.get('/GetVisceralFat', visceral.getvisceralfat);



};

