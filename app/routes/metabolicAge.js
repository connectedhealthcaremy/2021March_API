 'use strict';

module.exports = function(app) {
// Visceral Fat route
var metabolicAge = require('../../app/controllers/metabolicAge');
app.post('/AddmetabolicAge', metabolicAge.addMetabolicAge);
app.get('/GetmetabolicAge', metabolicAge.getMetabolicAge);



};

