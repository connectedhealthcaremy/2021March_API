 'use strict';

 module.exports = function(app) {
 	// steps route
 	var sleep = require('../../app/controllers/sleep');
	app.post('/AddSleep_Anwaar', sleep.addSleep);
	app.post('/AddSleep',sleep.postSleep);
 	app.get('/GetSleep', sleep.getSleep);
 	app.get('/GetSleepSteps', sleep.getSleepSteps);


 	app.post('/addSleepSetting', sleep.addSleepSetting);
 	app.get('/getSleepSetting', sleep.getSleepSetting);


	app.post('/addWeeklySleepSettings', sleep.addWeeklySleepSetting);
 	app.get('/getWeeklySleepSetting', sleep.getWeeklySleepSetting);


 };
