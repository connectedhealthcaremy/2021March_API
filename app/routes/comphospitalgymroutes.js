 'use strict';

 module.exports = function(app) {
 	// Glucose route
 	var compHospital = require('../../app/controllers/comphospitalgym');
 	app.get('/getcomphospital', compHospital.getcomphospital);
 };
