 'use strict';

 module.exports = function(app) {
 	// Bone Density route
 	var bone = require('../../app/controllers/bonedensity');
 	app.post('/AddBoneDensity', bone.addBoneDensity);
 	app.get('/GetBoneDensity', bone.getBoneDensity);



 };