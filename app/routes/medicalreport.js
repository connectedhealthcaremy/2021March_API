 'use strict';

 module.exports = function(app) {
 	// Medical Report route
 	var medicalreport = require('../../app/controllers/medicalreport');

 	app.post('/Addmedicalreport', medicalreport.addmedicalReport);
 	app.get('/Getmedicalreport', medicalreport.getmedicalReport);

 	/***************
 	 ** Added by TSJ for Move LabReport from user.js to medicalreport.js
 	 ******************/

 	app.post('/AddLabReport', medicalreport.addLabReport);
 	app.get('/GetLabReport', medicalreport.getLabReport);

 	/***************
 	 ** Added by TSJ for Medical History
 	 ******************/

 	app.post('/AddmedicalHistory', medicalreport.addmedicalHistory);
 	app.get('/GetmedicalHistory', medicalreport.getmedicalHistory);

 };