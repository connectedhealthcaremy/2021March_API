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


/******************** Start Remove Heart Rate *********************************/
$sql_hr = "SELECT recordTime, userID FROM WeHealthDB.heartrate GROUP BY recordTime, userID HAVING COUNT(recordTime) > 1  AND COUNT(userID) > 1";
$result_hr = $conn->query($sql_hr);

if ($result_hr->num_rows > 0) {
    // output data of each row
    while($row_hr = $result_hr->fetch_assoc()) {


				 $id_array=array();

				 $sql1_hr = "select * from heartrate where recordTime='".$row_hr['recordTime']."' and userID='".$row_hr['userID']."'";
				 
				 $result1_hr = $conn->query($sql1_hr); 
				 while($row1_hr = $result1_hr->fetch_array()){

				 	$id_array[]=$row1_hr['heartRateID'];   
				 }  
                
               
				$newArray = array_shift($id_array);
				$implodedArray = implode(",", $id_array); 
                

			
				        $sql2_hr = "DELETE FROM heartrate WHERE heartRateID IN (".$implodedArray.")"; 
						if ($conn->query($sql2_hr) === TRUE) {
						//echo "Record deleted successfully.<br>"; 
						} else {
						echo "Error deleting record: " . $conn->error;
						}

						

				unset($id_array); 
				$newArray='';
				$implodedArray='';

       
    }
} else {
    echo "0 Duplicate results  for Heart Rate "; 
}

/******************** End Remove Heart Rate *********************************/



?>