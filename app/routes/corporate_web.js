 'use strict';

module.exports = function(app) {
// corporate website route
var corporate_web = require('../../app/controllers/corporate_web');
    app.post('/add_employee', corporate_web.addemployee);
    app.post('/addDietationMember', corporate_web.addDietationMember);


app.post('/add_employee_ourcheckup', corporate_web.addemployee1);
///get userid,email list
app.get('/getcorporateuserIDlist', corporate_web.getcorporateuserIDlist);
app.get('/get_corporate_users_details', corporate_web.get_corporate_users_details);
app.get('/get_corporate_users_health_summary', corporate_web.get_corporate_users_health_summary);
app.get('/get_corporate_users_sleep', corporate_web.get_corporate_users_sleep);
app.get('/get_corporate_users_food', corporate_web.get_corporate_users_food);

/////care plan for corporate
app.post('/careplansetting_corporate', corporate_web.careplansetting_corporate); 
app.get('/getcareplandisplay_corporate', corporate_web.getcareplandisplay_corporate);

//////Rewards for corporates
app.get('/get_corporate_rewards', corporate_web.get_corporate_rewards);
app.get('/get_rewards_activity', corporate_web.get_rewards_activity);
app.get('/admin_deaily_records', corporate_web.admin_deaily_records);

/////////GET 
app.get('/reward_challangeActivityDetails', corporate_web.reward_challangeActivityDetails); 
app.get('/challengeScoredetails', corporate_web.challengeScore); 
app.get('/challengeScoreFinal', corporate_web.challengeScoreFinal);

app.get('/countTargetChallengeScore', corporate_web.countTargetChallengeScore);

};

