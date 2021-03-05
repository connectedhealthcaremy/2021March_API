'use strict';

module.exports = function(app) {
	// Home route
	var notify = require('../../app/controllers/messege');

	app.post('/addMessage', notify.addmessage);
	app.get('/getMessageInbox', notify.getMessageinbox);
	app.get('/getMessageSent', notify.getmessagesent);
	app.get('/GetMessageDetailsinbox', notify.getmessageinboxdetail);
	app.get('/inboxMessageCount', notify.getmessageinboxcount);
	app.get('/GetMessageCount', notify.getMessagecount);
	app.post('/ReadAllMessage', notify.readallmessagesInbox);
	app.get('/ReadAllMessages', notify.readAllMessages);
	app.get('/loadMoregetMessageInbox', notify.loadmoregetmessageinbox);
	app.get('/loadMoregetMessageSent', notify.loadmoregetmessagesent);
	app.post('/readMessage', notify.readmessages);
	app.post('/deleteMessage', notify.deletemessages);
	app.post('/importantmessages', notify.importantmessages);
	app.get('/getDoctorList', notify.getDoctorList);


};
