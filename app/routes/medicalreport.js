 'use strict';

 module.exports = function(app) {
 	// BMR route
 	var medicalreport = require('../../app/controllers/medicalreport');
 	app.post('/Addmedicalreport', medicalreport.addmedicalreport);
 	app.get('/Getmedicalreport', medicalreport.getmedicalreport);



 };