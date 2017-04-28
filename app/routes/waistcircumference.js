 'use strict';

module.exports = function(app) {
//  route
var waistcircumference = require('../../app/controllers/waistcircumference');
app.post('/Addwaistcircumference', waistcircumference.addwaistcircumference);
app.get('/getwaistcircumference', waistcircumference.getwaistcircumference);
app.put('/updatewaistcircumference', waistcircumference.updatewaistcircumference);
app.delete('/deletewaistcircumference', waistcircumference.deletewaistcircumference);



};

