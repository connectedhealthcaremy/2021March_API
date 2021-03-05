<?php 
ini_set('display_errors', 1);
error_reporting(E_ALL);
ini_set('max_execution_time', 50000000000000000); 

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

/******************** Start Remove Sleep *********************************/

$sql_sleep = "SELECT startTime, userID FROM WeHealthDB.sleep GROUP BY startTime, userID HAVING COUNT(startTime) > 1  AND COUNT(userID) > 1";
$result_sleep = $conn->query($sql_sleep);

if ($result_sleep->num_rows > 0) {
    // output data of each row
    while($row_sleep = $result_sleep->fetch_assoc()) {


				 $id_array=array();

				 $sql1_sleep = "select sleepID from sleep where startTime='".$row_sleep['startTime']."' and userID='".$row_sleep['userID']."'";
				 
				 $result1_sleep = $conn->query($sql1_sleep); 
				 while($row1_sleep = $result1_sleep->fetch_array()){

				 	$id_array[]=$row1_sleep['sleepID'];   
				 }  
                
               
				$newArray = array_shift($id_array);
				$implodedArray = implode(",", $id_array); 

				
				        $sql2_sleep = "DELETE FROM sleep WHERE sleepID IN (".$implodedArray.")"; 
						if ($conn->query($sql2_sleep) === TRUE) {
						//echo "Record deleted successfully.<br>"; 
						} else {
						echo "Error deleting record: " . $conn->error;
						}

						

				unset($id_array); 
				$newArray='';
				$implodedArray='';

       
    }
} else {
    echo "0 Duplicate results  for Sleep <br>"; 
}

/******************** End Remove Sleep *********************************/


?>