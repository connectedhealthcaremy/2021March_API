 'use strict';

 module.exports = function(app) {
 	// Muscle Mass route
 	var muscle = require('../../app/controllers/musclemass');
 	app.post('/AddMuscleMass', muscle.addmusclemass);
 	app.get('/GetMuscleMass', muscle.getmusclemass);



 };