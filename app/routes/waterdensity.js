 'use strict';

module.exports = function(app) {
// water density route
var water = require('../../app/controllers/waterdensity');
app.post('/insertWaterDensityData', water.addwater);
app.get('/retrieveWaterDensityData', water.getwater);



};

