'use strict';

module.exports = function(app) {
// Home route
var file = require('../../app/controllers/file');
var randtoken = require('rand-token');
var fs = require('fs');
var multer  = require('multer'); 




    app.post('/uploadsImage', file.uploadfiles); 
    app.post('/uploadmedicalreport', file.uploadfilesmedicalreport); 
    app.post('/uploaduserpic', file.uploaduserpic);
    app.get('/FetchUplodImages', file.fetchuploadfiles);


    app.post('/uploadlabreport', file.saveMedia); 

    app.get('/downloadlabreport', file.downloadlabreport);

    app.get('/fileupd', function(req, res){   
        res.send(
    	
            '<form action="http://api.umchtech.com:3000/uploadmedicalreport" method="post" enctype="multipart/form-data">'+
            '<input type="text" name="userid" value="631" >'+
            '<input type="file" name="photo">'+
            '<input type="submit" value="Upload">'+
            '</form>'
        );
    });

};








































