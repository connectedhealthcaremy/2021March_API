 'use strict';

 module.exports = function(app) {
 	//  route
 	var bodydensity = require('../../app/controllers/bodydensity');
 	app.post('/AddBodydensityData', bodydensity.addbodydensityData);
 	app.get('/getbodydensityData', bodydensity.getbodydensity);
 	app.put('/updatebodydensityData', bodydensity.updatebodydensity);
 	app.delete('/deletebodydensityData', bodydensity.deletebodydensity);



 };