 'use strict';

 module.exports = function(app) {
 	// route
 	var oxygen = require('../../app/controllers/oxygen');
 	app.post('/insertBloodOxygenLevelData', oxygen.addoxygen);
 	app.get('/retrieveBloodOxygenData', oxygen.getoxygen);
 	app.put('/BloodOxygenUpdatefinal', oxygen.updateoxygen);
 	app.delete('/BloodOxygenDelete', oxygen.deleteoxygen);


 };