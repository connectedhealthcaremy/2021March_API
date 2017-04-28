 'use strict';

 module.exports = function(app) {
 	// BMR route
 	var temprature = require('../../app/controllers/temprature');
 	app.post('/addtemprature', temprature.addtemprature);
 	app.get('/gettemprature', temprature.gettemprature);
 	app.put('/tempratureUpdatefinal', temprature.updatetemprature);
 	app.delete('/tempratureDelete', temprature.deletetemprature);



 };