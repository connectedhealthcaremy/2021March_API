<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "139.59.226.189";
$username = "umch";
$password = "umch!@#$";
$dbname = "umch";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 

$params = explode(",", $argv[1]);
///echo $params[0] ." - " . $params[1];

$userid=$params[0]; 

// $userid=$_GET['userid'];
$end_date=date('Y-m-d');


////get user challeneges ID list
$sql="select challenges.challengeID , challenges.startDate FROM WeHealthDB.challenges
							inner join challenges_user on challenges.challengeID=challenges_user.challengeID
							where challenges.challange_type=1 and challenges_user.userID='$userid' 
							and challenges.endDate > '$end_date'";

	$result = $conn->query($sql);
	while ($row=$result->fetch_assoc()) {
     
     $challenge_id=$row['challengeID'];
	 $challenge_startDate=$row['startDate']; 


	 ///////////////////////Start calculating target Weekly challange///////////////////////////////////
	$sql="SELECT challengeActivities, consective_number_days , consective_number_weeks , challengeID FROM WeHealthDB.challenges where challengeID='$challenge_id'";
	$result = $conn->query($sql);
	$challanges_activity=$result->fetch_assoc();
	$challanges_activity_final=explode(',',$challanges_activity['challengeActivities']);
	$challanges_activity_final=$challanges_activity_final[0];
	$consective_number_days=$challanges_activity['consective_number_days'];
	$consective_number_weeks=$challanges_activity['consective_number_weeks'];
	$challengeID = $challanges_activity['challengeID'];


	$sql="select points , target from reward_challangeActivityDetails where activity_type='$challanges_activity_final'";
	$result = $conn->query($sql);
	$steps_points=$result->fetch_assoc();
	$steps_points_final=$steps_points['points'];
	$target_activity=$steps_points['target'];


    if($consective_number_days==0)
		{
			$consective_number_days=7; 
			$target_activity=($consective_number_days * $target_activity);
			///console.log("steps_points_final="+steps_points_final+'-consective_number_days='+consective_number_days+'--consective_number_weeks='+consective_number_weeks);
			$target_points=$steps_points_final * $consective_number_days * $consective_number_weeks;
			//console.log("0--target Points => "+target_points);
		} 
	else {
			$target_activity=($consective_number_days * $target_activity); 
			// calculate target based of activity points * consective_days* consective Weeks
			if($consective_number_weeks==0){$consective_number_weeks=1;} 
			 $target_points=$steps_points_final * $consective_number_days * $consective_number_weeks;
			//console.log("target Points => "+target_points);
			
		}


//echo $challenge_startDate.'<hr>';
   ///////////count and get number of weeks between dates
			$start_date = $challenge_startDate;
			$end_Date = $end_date;

			$startTime = strtotime($start_date);
			$endTime = strtotime($end_Date);

			$weeks = array();
			$date = new DateTime();
			$i=0;

			while ($startTime < $endTime) {  
			$weeks[$i]['week'] = date('W', $startTime);
			$weeks[$i]['year'] = date('Y', $startTime); 
			$date->setISODate($weeks[$i]['year'], $weeks[$i]['week']);
			$weeks[$i]['Monday']=$date->format('Y-m-d'); 
			$weeks[$i]['Friday'] = date('Y-m-d',strtotime($weeks[$i]['Monday'] . "+6 days"));
			$startTime += strtotime('+1 week', 0);
			$i++;
			}

 // echo '<pre>';print_r($weeks);
       
       $week_start='';
       $week_end='';
			foreach ($weeks as $value) {
				$week_start=$value['Monday'];
				$week_end=$value['Friday'];

				/////Start counting challenge steps
				$count_challenge_steps="SELECT sum(stepQty) as steps , date(startTime) as week_date FROM WeHealthDB.step where  userID='$userid' and stepQty > 0 and isdeleted=0 and 
				    date(startTime) between date('$week_start') and date('$week_end')";

					$result_count_challenge_steps = $conn->query($count_challenge_steps);
					$steps_taken_res=$result_count_challenge_steps->fetch_assoc(); 
					$steps_taken=$steps_taken_res['steps'];

					if($steps_taken >= $target_activity )
					{ ///current week goal achieved
                      
                      ///check fr previous calculation
					$sql_check_previous_calc_date="SELECT id, calculationDate FROM WeHealthDB.challengeScore 
					where weekStartDate='$week_start' and weekEndDate='$week_end' and userID='$userid'";
					$result_check_previous_calc_date = $conn->query($sql_check_previous_calc_date);
					//$response_found=$result_check_previous_calc_date->fetch_assoc();
                    
                    if ($result_check_previous_calc_date->num_rows > 0) {
                    	/////Record found and Skip the insertion
                    	echo '<br>Record found and Skip the insertion<br>';
                    }
                    else
                    {///no record foe this week

                    	$score_achieved=$steps_points_final * $consective_number_days;
                        
                        $sql="INSERT INTO challengeScore (challengeID, userID, achievedScore, TagetScore , startDate , endDate  ,isConsecutive , isAchieved , calculationDate, weekStartDate, weekEndDate, status, achievedPoints , totalPoints)
				            VALUES ('$challengeID', '$userid', '$steps_taken', '$target_activity', '$week_start', '$week_end', '1', '1', '$end_date', '$week_start', '$week_end', '1', '$score_achieved' , '$target_points')";
                                  
						if ($conn->query($sql) === TRUE) {
						echo "challenge Score Added of User:'$userid' From: '$week_start' To : '$week_end' <br>";
						} else {
						echo "Error: " . $sql . "<br>" . $conn->error;
						}

                    }

					}   
			}
 
	}


?>