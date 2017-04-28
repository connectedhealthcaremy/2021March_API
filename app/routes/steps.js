 'use strict';

 module.exports = function(app) {
 	// steps route
 	var step = require('../../app/controllers/steps');
 	app.post('/AddSteps', step.addSteps);
 	app.get('/GetSteps', step.getSteps);


 };