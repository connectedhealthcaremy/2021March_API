 'use strict';

 module.exports = function(app) {
     //  route
     var fitness = require('../../app/controllers/fitness');

     /****
      ** 2.4 km run test
      *****/
     app.post('/Addruntest', fitness.addruntest);
     app.get('/Getruntest', fitness.getruntestbyuser);
     app.get('/GetsingleRunTest', fitness.getsingleruntest);
     app.get('/GetRunTestAverage', fitness.getaveragetestScore);
     app.get('/GetRunTestByDays', fitness.gettestScorebydays);
     app.get('/GetRunTestAveragebyDays', fitness.gettestAverageScorebydays);
     app.get('/GetRunTestByMonth', fitness.gettestdatabymonth);
     app.put('/Updateruntest', fitness.updateruntestuser);
     app.post('/UpdateruntestWeb', fitness.updateruntestuser);
     app.delete('/Deleteruntest', fitness.deleteruntest);
     app.post('/DeleteruntestWeb', fitness.deleteruntest);

     /********
      ***Push up fitness test
      ********/

     app.post('/Addpushuptest', fitness.addpushuptest);
     app.get('/Getpushuptest', fitness.getpushuptest);
     app.get('/GetsinglePushUpTest', fitness.getsinglepushuptest);
     app.get('/GetPushUpTestByDays', fitness.getpushupScorebydays);
     app.get('/GetPushUpTestByDays1', fitness.getpushupScorebydays1);
     app.get('/GetPushUpTestAveragebyDays', fitness.getAveragepushupScore);
     app.get('/GetPushUpTestByMonth', fitness.getpushuptestdatabymonth);
     app.put('/UpdatePushUptest', fitness.updatepushuptest);
     app.post('/UpdatePushUptestWeb', fitness.updatepushuptest);
     app.delete('/DeletePushUptest', fitness.deletepushtest);
     app.post('/DeletePushUptestWeb', fitness.deletepushtest);
     /********
      **Curl up fitness test
      *********/

     app.post('/Addcurluptest', fitness.addcurluptest);
     app.get('/Getcurluptest', fitness.getcurluptest);
     app.get('/GetsinglecurlUpTest', fitness.getsinglecurluptest);
     app.get('/GetCurlUpTestByDays', fitness.getcurlupScorebydays);
     app.get('/GetCurlUpTestByDays1', fitness.getcurlupScorebydays1);
     app.get('/GetCurlUpTestAveragebyDays', fitness.getAveragecurlupScore);
     app.get('/GetCurlUpTestByMonth', fitness.getcurluptestdatabymonth);
     app.put('/UpdateCurlUptest', fitness.updatecurluptest);
     app.post('/UpdateCurlUptestWeb', fitness.updatecurluptest);
     app.delete('/DeleteCurlUptest', fitness.deletecurluptest);
     app.post('/DeleteCurlUptestWeb', fitness.deletecurluptest);
     /**********
      ***Body weight squats test
      **********/

     app.post('/Addsquatstest', fitness.addsquatstest);
     app.get('/Getsquatstest', fitness.getsquatstest);
     app.get('/GetsingleSquatsTest', fitness.getsinglesquatstest);
     app.get('/GetsquatsTestByDays', fitness.getsquatsScorebydays);
     app.get('/GetsquatsTestByDays1', fitness.getsquatsScorebydays1);

     app.get('/GetsquatsTestAveragebyDays', fitness.getAveragesquatsScore);
     app.get('/GetSquatsTestByMonth', fitness.getsquatstestdatabymonth);
     app.put('/UpdateSquatstest', fitness.updatesquatstest);
     app.post('/UpdateSquatstestWeb', fitness.updatesquatstest);
     app.delete('/DeleteSquatstest', fitness.deletesquatstest);
     app.post('/DeleteSquatstestWeb', fitness.deletesquatstest);
     /************
      ** Standing Long Jump test 
      ************/

     app.post('/Addlongjumptest', fitness.addlongjumptest);
     app.get('/Getlongjumptest', fitness.getlongjumptest);
     app.get('/GetsinglelongjumpTest', fitness.getsinglelongjumptest);
     app.get('/GetlongjumpTestByDays', fitness.getlongjumpScorebydays);
     app.get('/GetlongjumpTestByDays1', fitness.getlongjumpScorebydays1);

     app.get('/GetlongjumpTestAveragebyDays', fitness.getAveragelongjumpScore);
     app.get('/GetLongJumpTestByMonth', fitness.getlongjumptestdatabymonth);
     app.put('/UpdateLongJumptest', fitness.updatelongjumptest);
     app.post('/UpdateLongJumptestWeb', fitness.updatelongjumptest);
     app.delete('/DeleteLongJumptest', fitness.deletelongjumptest);
     app.post('/DeleteLongJumptest', fitness.deletelongjumptest);

     /************
      ** Heart Rate Zone 
      ************/

     app.post('/Addheartratetest', fitness.addheartratetest);
     app.get('/Getheartratetest', fitness.getheartratetest);
     app.get('/GetsingleheartrateTest', fitness.getsingleheartratetest);
     app.get('/GetheartrateTestByDays', fitness.getheartrateScorebydays);
     app.get('/GetheartrateTestAveragebyDays', fitness.getAverageheartrateScore);
     app.get('/GetheartrateTestByMonth', fitness.getheartratedatabymonth);
     app.put('/UpdateheartrateTest', fitness.updateheartratetest);
     app.post('/UpdateheartrateTestWeb', fitness.updateheartratetest);
     app.delete('/DeleteheartrateTest', fitness.deleteheartratetest);
     app.post('/DeleteheartrateTestWeb', fitness.deleteheartratetest);

     /**
      * Rock port Walking test
      */
     app.post('/Addtestrockport', fitness.addrockporttest1);
     app.put('/updatetestrockport', fitness.updaterockportwalkingtestuser);
     app.delete('/Deleterockporttest', fitness.deleterockportwalkingtest);
     app.get('/Gettestrockport', fitness.getrockportwalkingtest);
     /**
      * YMCA step test
      */
     app.post('/AddymcaStepWalking', fitness.addymcasteptests);
     app.put('/updateymcawalkingtestuser1', fitness.updateymcawalkingtestuser1);
     app.delete('/Deleteymcatest', fitness.deleteymcatest);
     app.get('/GetymcaStepWalkingTest', fitness.getymcasteptest);
     app.get('/GetYmcaStepTestByDates', fitness.getymcasteptestbydays);
     app.get('/GetymcaStepTestAveragebyDates', fitness.getymcaAveragebydatesUser);
     app.get('/Getymcasteptestbymonth', fitness.getymcastepdatabymonth);


 };