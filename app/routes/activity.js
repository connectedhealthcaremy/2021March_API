 'use strict';

 module.exports = function(app) {
 	// Activity route
 	var activity = require('../../app/controllers/activity');

 	app.post('/Addactivity', activity.addactivity);
 	app.get('/Getactivity', activity.getactivity);
 	app.put('/Updateactivity', activity.updateactivity);
 	app.delete('/Deleteactivity', activity.deleteactivity);

 	app.post('/AddactivitySleep', activity.addactivitySleep);
 	app.get('/GetactivitySleep', activity.getactivitySleep);

 	app.post('/AddactivityWater', activity.addactivitywater);
 	app.get('/GetactivityWater', activity.getactivityWater);
 	app.put('/UpdateactivityWater', activity.updateactivityWater);
 	app.delete('/DeleteactivityWater', activity.deleteactivitywater);



 };