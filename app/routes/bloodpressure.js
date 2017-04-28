 'use strict';

 module.exports = function(app) {
 	// bloodpressure route
 	var bloodpressure = require('../../app/controllers/bloodpressure');

 	app.post('/insertBloodPressureGoal', bloodpressure.addbloodpressuregoal);
 	app.put('/updateBloodPressureGoal', bloodpressure.updatebloodpressuregoal);
 	app.delete('/deleteBloodPressureGoal', bloodpressure.deletebloodpressuregoal);
 	app.get('/retrieveBloodPressureGoal', bloodpressure.getbloodpressuregoal);


 	app.post('/addbp', bloodpressure.addbloodpressure1);
 	app.get('/retrieveBloodPressureData', bloodpressure.getbloodpressure);
 	app.put('/updatebp', bloodpressure.updatebloodpressure);
 	app.delete('/deletebp', bloodpressure.deletebloodpressure);



 };