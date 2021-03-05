 'use strict';

 module.exports = function(app) {
 	// steps route
 	var step = require('../../app/controllers/steps');
	app.post('/AddStepsOld', step.addSteps);
	app.post('/AddSteps', step.insertSteps);
 	app.get('/GetSteps', step.getSteps);


// app.get('/target_challenge_calculation', step.target_challenge_calculation_backup);

 };