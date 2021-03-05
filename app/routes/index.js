 'use strict';

module.exports = function(app) {
// Home route
var index = require('../../app/controllers/index');
app.get('/showProducts', index.getLatestProducts);

app.get('/loadTesting', index.loadTesting);

};

