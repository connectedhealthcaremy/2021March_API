 'use strict';

module.exports = function(app) {
//  route
var hearrate = require('../../app/controllers/hearrate');
app.post('/addheartrate', hearrate.addhearrate);
app.get('/getheartrate', hearrate.gethearrate);
app.put('/updatehearrate', hearrate.updatehearrate);
app.delete('/deletehearrate', hearrate.deletehearrate);



};

