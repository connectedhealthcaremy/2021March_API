 'use strict';

 module.exports = function(app) {
 	// BMR route
 	var challange = require('../../app/controllers/challange');
 	app.get('/GetUserChallange', challange.get_challenges);
 	app.post('/update_challanges', challange.update_challanges);

 	app.get('/get_target_challanges_status', challange.get_target_challanges_status);
 	app.get('/get_target_challanges_details', challange.get_target_challanges_details);



 };