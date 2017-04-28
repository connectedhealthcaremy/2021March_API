 'use strict';

 module.exports = function(app) {
 	// Weight route
 	var weight = require('../../app/controllers/weight');
 	app.post('/AddWeight', weight.addweight);
 	app.get('/GetWeight', weight.getweight);
 	app.put('/UpdateWeight', weight.updateweight);
 	app.delete('/DeleteWeight', weight.deleteweight);



 };