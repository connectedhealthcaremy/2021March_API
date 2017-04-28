 'use strict';

 module.exports = function(app) {
 	// Glucose route
 	var glucose = require('../../app/controllers/glucose');
 	app.post('/insertBloodGlucoseGoal', glucose.addglucosegoal);
 	app.get('/retrieveBloodGlucoseGoal', glucose.getglucosegoal);
 	app.put('/UpdateBloodGlucoseGoal', glucose.updateglucosegoal);
 	app.delete('/DeleteBloodGlucoseGoal', glucose.deleteglucosegoal);

 	app.post('/insertBloodGlucoseLevel', glucose.addglucose);
 	app.get('/retrieveBloodGlucoseLevel', glucose.getglucose);
 	app.put('/UpdateGlucoseLevel', glucose.updateglucose);
 	app.delete('/DeleteGlucoseLevel', glucose.deleteglucose);


 };