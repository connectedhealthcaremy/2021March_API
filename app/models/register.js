'use strict';

module.exports = function (sequelize, DataTypes) {

	var user = sequelize.define('user', {
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
	}, {
		classMethods: {
			recordRawData: (userID, apiService, rawData) => {
				var sql = "INSERT INTO rawDataLog(userID, apiService, rawData) VALUES('" + userID + "','" + apiService + "','" + rawData + "');";
				return sequelize.query(sql, { type: sequelize.QueryTypes.INSERT });
			},

			newUser: function (username, email, password, token, realpwd, deviceID) {
				var sql = "INSERT INTO user (username, password,realmpwd, email, token,deviceID) VALUES ('" + username + "', '" + password + "','" + realpwd + "', '" + email + "', '" + token + "', '" + deviceID + "') ";
				var id = sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});
				///Get Token and user id

				var sql1 = "SELECT userID, token, realmpwd FROM user WHERE username='" + username + "'";
				return sequelize.query(sql1, {
					type: sequelize.QueryTypes.SELECT
				});
			},

			checkUser: function (username) {
				var sql = "SELECT * FROM user WHERE username='" + username + "'";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			getDiscount: function (voucherCode, planid) {
				var sql = "SELECT discAmount, quantity, used from WeHealthDB.voucher where voucherCode = '" + voucherCode + "' and planid = '" + planid + "' and status = 1;";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			}, // add voucherUsed Here

			voucherUsed: function (voucherCode, planid, increment) {
				var sql = "update voucher set used = '" + increment + "' where voucherCode = '" + voucherCode + "' and planid = '" + planid + "';";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});
			},

			authUser: function (token) {
				var sql = "SELECT userID,email, username, firstName, lastName from user WHERE token='" + token + "'";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			cancelRescheduleUserProfessionalAppointment: function (updateAppointment) {
				return sequelize.query(updateAppointment, { type: sequelize.QueryTypes.UPDATE });
			},
			getBookedAppointment: function (bookedAppointment) {
				return sequelize.query(bookedAppointment, { type: sequelize.QueryTypes.SELECT });
			},
			login: function (username, password) {
				//var sql = "SELECT userID, username, token, realmpwd, email, role, questionnaire,  firstName , lastName, gender, birthday as birthDate, height as height, weight as weight, profilepic, address as address, town as town, state as state, country as country, postcode as postCode, phone as mobileNumber, userRole, questionnaire FROM user WHERE username='" + username + "' AND password='" + password + "'";
				var sql = `SELECT user.userID, user.username, user.token, user.realmpwd, user.email, user.role, user.questionnaire,  user.firstName , user.lastName, user.gender,
							user.birthday as birthDate, user.height as height,
							user.weight as weight, user.profilepic, user.address as address, user.town as town, user.state as state, user.country as country, user.postcode as postCode,
							user.phone as mobileNumber,user.ic_number,user.loginType,
							user.userRole, user.questionnaire, CASE WHEN cardManagment.name IS NULL THEN '' ELSE cardManagment.name END AS name ,
							CASE WHEN cardManagment.status IS NULL THEN '' ELSE cardManagment.status END AS status  FROM user
							left join cardManagment
							on user.userID=cardManagment.userID
							WHERE username='` + username + `' AND password='` + password + `';`;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			getUser: function (userid, token) {
				var sql = "SELECT userID, ic_number,loginType ,username, realmpwd,email,phone,questionnaire, firstName , lastName, gender, birthday as birthDate, height as height, height_unit,  weight as weight, profilepic, address as address, town as town, state as state, country as country, postcode as postCode, phone as mobileNumber , version from user WHERE userID='" + userid + "' AND token='" + token + "'";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			updateUser: function (userid, firstName, lastName, gender, birthDate, height, weight, address, town, state, country, postCode, phone, height_unit, version, email, questionnaire, ic_number, loginType) {
				var sql = "UPDATE user SET firstName='" + firstName + "', lastName='" + lastName + "', address='" + address + "', town='" + town + "', state='" + state + "', postcode='" + postCode + "', country='" + country + "', gender='" + gender + "', height='" + height + "', height_unit='" + height_unit + "', weight='" + weight + "' , phone= '" + phone + "', birthday='" + birthDate + "' , version='" + version + "' , email='" + email + "' , questionnaire='" + questionnaire + "', ic_number='" + ic_number + "',loginType='" + loginType + "'  WHERE userID='" + userid + "'";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});
			},
			updateUserPassword: function (userid, password) {
				var sql = "UPDATE user SET password='" + password + "' WHERE userID='" + userid + "'";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			checkByname: function (email) {
				var sql = "SELECT * from user WHERE username='" + email + "' and suspended=0";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			checkByuserid: function (userid) {
				var sql = "SELECT * from user WHERE userID='" + userid + "' and suspended=0";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getuserDetails: function (userid) {
				//var sql = 'SELECT user.profilepic, user.email, user.firstName, user.lastName, user.phone, user.height, user.address, user.town, user.state, user.country, user.gender, user.birthday, user.weight as weightQty ,weight.weightQty as weight, weight.scaleDate  from user left join weight on user.userID=weight.userID  where user.userID=' + userid + ' order by weight.scaleDate desc LIMIT 1';
				var sql = 'SELECT user.profilepic, user.email, user.firstName, user.lastName, user.phone, user.height, user.address, user.town, user.state, user.country, user.gender, user.birthday, user.weight as weightQty ,user.weight as weight  from user where user.userID=' + userid;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			getGCMtoken: function () {
				var sql = "SELECT deviceID from user WHERE deviceID !=''";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			socialLoginCheck: function (username) {
				var sql = "SELECT * from user WHERE username ='" + username + "' AND email ='" + username + "'";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			socialregister: function (sql) {
				///register user
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			updateDeiveToken: function (sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			checkDeiveToken: function (id) {

				var sql1 = "SELECT deviceID FROM user WHERE userID='" + id + "'";
				return sequelize.query(sql1, {
					type: sequelize.QueryTypes.SELECT
				});

			},


			checkUsername: function (username) {

				var sql1 = "SELECT username FROM user WHERE username='" + username + "'";
				return sequelize.query(sql1, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			loginSocial: function (id) {
				var sql1 = "SELECT * FROM user WHERE userID='" + id + "'";
				return sequelize.query(sql1, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			addNextOfKin: function (sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			addCallLogs: function (sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			addUserProfessionalAppointment: function (sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			getNextOfKin: function (userid) {
				var sql = "select t1.id, t2.firstName,t2.lastName, t2.username as familyname, t2.token , t2.phone ,t2.email,t1.Status as approve, t1.userID, t1.familyID,t1.relationship, t1.type,t1.status,t1.InsertationDatetime, t1.EmailNotification as email_notification, t1.Appnotification as app_notification, t1.SmsNotification as sms_notification from family t1 inner join user t2 on t1.familyID=t2.userID where t1.userID='" + userid + "' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},

			getUserPlan: function (userid) {
				var sql = "select * from UserPlan where userID='" + userid + "' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},

			retrievePlanFeatures: function (userid) {
				var sql = "select * from planfeatures";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},

			addPlanFeatures: function (planid, featurename, featuredescription) {
				var sql = "INSERT INTO planfeatures(planid,featurename,featuredescription,insertiondate) VALUES('" + planid + "','" + featurename + "','" + featuredescription + "',CURDATE());";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});
			},



			getdoctorsappointment: function (userid) {
				var sql = "select * from userProfessionalAppointment where professionalID='" + userid + "' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},

			getdoctorsSchedule: function (userid) {
				var sql = "select * from ProfessionalSchedule where ProfessionalId='" + userid + "' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},

			getHealthcareProviders: function (organizationID) {
				var sql = "select * from professional where organizationID='" + organizationID + "' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},

			getInvoice: function (organizationID) {
				var sql = "select invoicePrefix, lastInvoiceNo from compHospitalGym where id='" + organizationID + "' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},

			updateInvoice: function (organizationID, lastNo) {
				var sql = "UPDATE compHospitalGym set lastInvoiceNo = " + lastNo + "  where id='" + organizationID + "' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});
			},

			insertVoucher: function (professionalID, voucherType, voucherDesc, voucherCode, planid, validatefrom, validateto, discType, discAmount, maxDiscAmount, quantity) {
				var sql = " insert into voucher(professionalID, voucherType, voucherDesc, voucherCode, planID, validatefrom, validateto, discType, discAmount, maxDiscAmount, quantity, used, status, insertDateTime) value('" + professionalID + "','" + voucherType + "','" + voucherDesc + "','" + voucherCode + "','" + planid + "','" + validatefrom + "','" + validateto + "','" + discType + "','" + discAmount + "','" + maxDiscAmount + "','" + quantity + "',0,1, NOW());";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});
			},

			getPaymentTranscation: function (userid) {
				var sql = "select * from PaymentTransaction where userid='" + userid + "' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			getPromotions: function (userid) {
				var sql = "select * from Promotions where userid='" + userid + "' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			// where planid='" + planid + "' 
			getsubscriptionplan: function (planid) {
				var sql = "select * from subscriptionplan";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},


			//get doctore list zain
			getListOfDoctoresAgainstID: function (userid) {
				var sql = "select t1.firstName,t1.lastName,t1.gender, t1.username, t1.token , t1.phone ,t1.email,t2.status, t2.userID,t2.professionalID  from user t1 inner join userProfessionalRegistration t2 on t1.userID=t2.professionalID where t2.userID='" + userid + "' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			getPendingListOfDoctoresAgainstID: function (username) {
				var sql = "select t1.firstName,t1.lastName,t1.gender, t1.username, t1.token , t1.phone ,t1.email,t2.status, t1.userID,t2.professionalID  from user t1 inner join professionalInvitation t2 on t1.userID=t2.professionalID where t2.email='" + username + "' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},

			getUserAppointment: function (userid) {
				var sql = "SELECT userProfessionalAppointment.*, user.firstName as DoctorfirstName, user.lastName as DoctorlastName FROM WeHealthDB.userProfessionalAppointment inner join user on userProfessionalAppointment.professionalID=user.userID where userProfessionalAppointment.userID='" + userid + "' ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			updateUserProfessionalAppointment: function (sql) { // cy added 19 May 2020

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			addCardManagment: function (sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			update_CardManagment: function (sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			deleteUserCardManagement: function (userid) {
				var sql = "DELETE FROM cardManagment where userID='" + userid + "' ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.DELETE
				});

			},
			checkUserCurrentCardManagement: function (userid, position) {
				var sql = "SELECT * FROM cardmanagement_app where userID='" + userid + "' AND position='" + position + "' ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getUserIllness: function (userid) {
				var sql = "SELECT * FROM userillness where userID='" + userid + "'";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			getUser_CardManagement: function (userid) {
				var sql = "SELECT * FROM cardmanagement_app where userID='" + userid + "' ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			addUser_Etiqa_mobile: function (sql) {
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			getUsername: function (sql) {
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getCallLogs: function (sql) {
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getUserID: function (sql) {
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getQuery: function(sql) {
                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.SELECT
                });
            },
			getUser_Etiqa_mobile: function (userid) {
				var sql = "SELECT * FROM WeHealthDB.etiqa_users_mobile where userid='" + userid + "' ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			get_companies_list: function () {
				var sql = "SELECT id, name, address, phone, contactPerson, refrence FROM WeHealthDB.compHospitalGym where type=0; ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			get_user_companie_name: function (userid) {

				var sql = `SELECT compHospitalGym.id, compHospitalGym.name, compHospitalGym.address, compHospitalGym.phone, compHospitalGym.contactPerson, compHospitalGym.refrence 
				FROM WeHealthDB.compHospitalGym
				inner join compHospitalGym_user_relation on compHospitalGym.id=compHospitalGym_user_relation.compHospitalGymID
				where compHospitalGym_user_relation.userID in 
				(SELECT professionalID as userID FROM WeHealthDB.userProfessionalRegistration where userID=` + userid + ` and status=1)
				group by compHospitalGym.id limit 1`;

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			get_user_parameter_settings: function (userid) {

				var sql = `SELECT * FROM WeHealthDB.userDeviceParameters where userid= ` + userid + ``;

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			lastaddIDsUserDeviceParameters: function (lastinsertid) {

				var sql = "select id AS id from userDeviceParameters where id >='" + lastinsertid + "'";
				return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });

			},
			deleteUserDeviceParameter: function (sql) {
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.DELETE
				});

			},
			updateFieldNames: function (sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			}


		}
	});

	return user;
};