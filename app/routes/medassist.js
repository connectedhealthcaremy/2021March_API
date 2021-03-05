 'use strict';

 module.exports = function(app) {

 	////Node Cron 	
 	/*var cron = require('node-cron');
 	 
 	var task = cron.schedule('* * * * *', function() {
 	    medassist.remindercheck();
 	}, false);*/

 	//task.start(); 

 	//task.destroy();  //task.stop()

 	// Weight route
 	var medassist = require('../../app/controllers/medassist');
 	app.get('/GetDoctors', medassist.getdoctors);
 	app.get('/GetPharmacist', medassist.getpharmacist);
     app.get('/GetMedicine', medassist.getmedicine);

     app.get('/GetMedicineStatus', medassist.getmedicineStatus);

 	/////////=================Add User Medicine================////////

 	app.post('/AddMyMedicine', medassist.addmymedicine);
 	app.get('/GetMyMedicine', medassist.getmymedicine);
 	app.post('/UpdateMyMedicine', medassist.updatemymedicine);
 	app.post('/deleteMyMedicine', medassist.deleteMyMedicine);

 	////===================Reminder to user================//////

 	app.get('/reminderCheck', medassist.remindercheck);

 	///==============Update medicine Status=================///////

 	app.post('/MyMedicineStatus', medassist.updatemedcinestatus);
 	app.get('/getmedicineStatus', medassist.getmedicineStatus);

 };