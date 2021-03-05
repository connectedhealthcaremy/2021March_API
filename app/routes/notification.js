'use strict';

module.exports = function(app) {
	// Home route
	var notify = require('../../app/controllers/notification');

	app.post('/addnotification', notify.addnotification);

	app.get('/getnotificationinbox', notify.getnotificationinbox);
	app.get('/getnotificationinboxApp', notify.getnotificationinboxApp);
	app.get('/getnotificationsent', notify.getnotificationsent);
	app.get('/GetNotificationDetailsinbox', notify.getNotificationinboxdetail);
	app.get('/GetNotificationDetailssent', notify.getNotificationsentdetail);// cy added 15may2020
	app.get('/GetNotificationCount', notify.getNotificationinboxcount);
	app.get('/GetMessageCount', notify.getMessagecount);
	app.post('/ReadAllNotifications', notify.readallnotificationsInbox);
	app.get('/ReadAllMessages', notify.readAllMessages);
	app.get('/loadmoregetNotificationinbox', notify.loadmoregetNotificationinbox);
	app.get('/loadmoregetNotificationsent', notify.loadmoregetNotificationsent);
	app.post('/readnotifications', notify.readnotifications);
	app.post('/deletenotifications', notify.deletenotifications);
    app.post('/isImportantNotifications', notify.isImportantNotifications);
    app.post('/isNotImportantNotifications', notify.isNotImportantNotifications);

    
    app.get('/GetPersonalizednotification', notify.GetPersonalizednotification);
    app.get('/getpersonalizednotificationstatus', notify.getPersonalizedNotificationStatus);
    app.post('/addpersonalizednotificationstatus',notify.addPersonalizedNotificationStatus);
     app.post('/insertPersonalizednotification',notify.insertPersonalizednotification);

};
