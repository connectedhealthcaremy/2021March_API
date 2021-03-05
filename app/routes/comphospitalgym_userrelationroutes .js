 'use strict';

 module.exports = function(app) {
 	// Glucose route
 	var compHospital = require('../../app/controllers/comphospitalgymuserrelation');
 	app.get('/getcomphospitaluserrelation', compHospital.getcomphospitaluserrelation);
	app.post('/addhospitaluserrelation', compHospital.insertCompHospitalUserRelation);
 };
