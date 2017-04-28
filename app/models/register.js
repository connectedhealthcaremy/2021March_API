'use strict';

module.exports = function(sequelize, DataTypes) {

	var user = sequelize.define('user',
	{
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
	},
	{
			classMethods: {
			newUser: function (username,email,password,token,realpwd,deviceID) { 
			var sql = "INSERT INTO user (username, password,realmpwd, email, token,deviceID) VALUES ('"+username+"', '"+password+"','"+realpwd+"', '"+email+"', '"+token+"', '"+deviceID+"') ";
			var id=sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT}); 
			///Get Token and user id
			
			var sql1 = "SELECT userID, token, realmpwd FROM user WHERE username='"+username+"'";
			return sequelize.query(sql1,{ type: sequelize.QueryTypes.SELECT});
			} ,
			
			checkUser: function (username) { 
			var sql = "SELECT * FROM user WHERE username='"+username+"'";
			return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
			}
			,
			authUser: function ( token)
			{
			var sql = "SELECT userID,email , firstName, lastName from user WHERE token='"+token+"'";
			return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
			}, 
			login: function(username, password)
			{
			var sql = "SELECT userID, username, token, realmpwd, email, role, questionnaire,  firstName , lastName, gender, birthday as birthDate, height as height, weight as weight, profilepic, address as address, town as town, state as state, country as country, postcode as postCode, phone as mobileNumber, userRole, questionnaire FROM user WHERE username='"+username+"' AND password='"+password+"'";
			return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
			},
			getUser: function (userid, token)
			{
			var sql = "SELECT userID, username, realmpwd, firstName , lastName, gender, birthday as birthDate, height as height, weight as weight, profilepic, address as address, town as town, state as state, country as country, postcode as postCode, phone as mobileNumber  from user WHERE userID='"+userid+"' AND token='"+token+"'";
			return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT}); 
			},
			updateUser: function (userid, firstName,lastName,gender,birthDate,height,weight,address,town,state,country,postCode,phone)
			{
			var sql = "UPDATE user SET firstName='"+firstName+"', lastName='"+lastName+"', address='"+address+"', town='"+town+"', state='"+state+"', postcode='"+postCode+"', country='"+country+"', gender='"+gender+"', height='"+height+"', weight='"+weight+"' , phone= '"+phone+"', birthday='"+birthDate+"' WHERE userID='"+userid+"'";
			
			return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
			},
			updateUserPassword: function(userid, password)
			{
			var sql = "UPDATE user SET password='"+password+"' WHERE userID='"+userid+"'";
			
			return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
			
			},
			checkByname: function(email)
			{
			var sql = "SELECT * from user WHERE email='"+email+"'";
			return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
			
			},
            checkByuserid: function(userid){
                var sql = "SELECT * from user WHERE userID='"+userid+"'";
			return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

            },
            getuserDetails: function(userid){
             var sql='SELECT user.profilepic, user.email, user.firstName, user.lastName, user.phone, user.height, user.address, user.town, user.state, user.country, user.gender, user.birthday, user.weight as weightQty ,weight.weightQty as weight, weight.scaleDate  from user left join weight on user.userID=weight.userID  where user.userID='+userid+' order by weight.scaleDate desc LIMIT 1';
             return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
            }
			,
			getGCMtoken : function ()
			{
			var sql = "SELECT deviceID from user WHERE deviceID !=''";
			return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});	
			},
			socialLoginCheck : function (username)
			{
			var sql = "SELECT * from user WHERE username ='"+username+"' AND email ='"+username+"'";
			return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});	
			},
			socialregister : function (sql)
			{
			///register user
			return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
			},
			updateDeiveToken : function (sql)
			{
			
			return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
			},
			loginSocial: function(id)
			{
			 var sql1 = "SELECT * FROM user WHERE userID='"+id+"'";
		      return sequelize.query(sql1,{ type: sequelize.QueryTypes.SELECT});
			
				}
			
			}
	}
	);

	return user;
};
