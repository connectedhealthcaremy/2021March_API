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

//$params = explode(",", $argv[1]);

/*************  Remove blood pressure Duplication ****************/
$sql = "SELECT recordTime, userID FROM bp GROUP BY recordTime, userID HAVING COUNT(recordTime) > 1  AND COUNT(userID) > 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {


				 $id_array=array();

				 $sql1 = "select * from bp where recordTime='".$row['recordTime']."' and userID='".$row['userID']."'";
				 $result1 = $conn->query($sql1); 
				 while($row1 = $result1->fetch_array()){

				 	$id_array[]=$row1['bpID'];  
				 }  


				$newArray = array_shift($id_array);
				$implodedArray = implode(",", $id_array); 

				
				        $sql2 = "DELETE FROM bp WHERE bpID IN (".$implodedArray.")"; 
						if ($conn->query($sql2) === TRUE) {
						//echo "Record deleted successfully.<br>"; 
						} else {
						echo "Error deleting record: " . $conn->error;
						}

						

				unset($id_array);
				$newArray='';
                $implodedArray='';
       
    }
} else {
    echo "0 Duplicate results for Blood Pressure <br>";
} 

/******************** End Remove Blood Pressure *********************************/

?>