 'use strict';

 module.exports = function(app) {
 	// Weight route
 	var skin = require('../../app/controllers/skinfold');
 	app.post('/Addskinfold', skin.addskinfold);



 };