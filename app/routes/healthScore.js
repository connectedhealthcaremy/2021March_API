 'use strict';

 module.exports = function(app) {
 	// BMR route
 	var healthScore = require('../../app/controllers/healthScore');
 	app.get('/getHealtScore', healthScore.getHealtScore);



 };