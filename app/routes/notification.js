'use strict';

module.exports = function(app) {
	// Home route
	var notify = require('../../app/controllers/notification');

	app.post('/addnotification', notify.addnotification);
	app.get('/getnotificationinbox', notify.getnotificationinbox);
	app.get('/getnotificationsent', notify.getnotificationsent);
	app.get('/GetNotificationDetailsinbox', notify.getNotificationinboxdetail);
	app.get('/GetNotificationCount', notify.getNotificationinboxcount);
	app.get('/GetMessageCount', notify.getMessagecount);
	app.post('/ReadAllNotifications', notify.readallnotificationsInbox);
	app.post('/ReadAllMessages', notify.readAllMessages);
	app.get('/loadmoregetNotificationinbox', notify.loadmoregetNotificationinbox);
	app.get('/loadmoregetNotificationsent', notify.loadmoregetNotificationsent);


};
