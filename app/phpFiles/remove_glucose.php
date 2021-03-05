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

/******************** Start Remove Blood Glucose *********************************/

$sql_glucose = "SELECT recordDateTime, user FROM WeHealthDB.glucose GROUP BY recordDateTime, user HAVING COUNT(recordDateTime) > 1  AND COUNT(user) > 1";
$result_glucose = $conn->query($sql_glucose);

if ($result_glucose->num_rows > 0) {
    // output data of each row
    while($row_glucose = $result_glucose->fetch_assoc()) {


				 $id_array=array();

				 $sql1_glucose = "select id from glucose where recordDateTime='".$row_glucose['recordDateTime']."' and user='".$row_glucose['user']."'";
				 $result1_glucose = $conn->query($sql1_glucose); 
				 while($row1_glucose = $result1_glucose->fetch_array()){

				 	$id_array[]=$row1_glucose['id'];  
				 }  
                

				$newArray = array_shift($id_array);
				$implodedArray = implode(",", $id_array); 
                
                

				        $sql2_glucose = "DELETE FROM glucose WHERE id IN (".$implodedArray.")"; 
						if ($conn->query($sql2_glucose) === TRUE) {
						//echo "Record deleted successfully.<br>"; 
						} else {
						echo "Error deleting record: " . $conn->error;
						}

						

				unset($id_array); 
				$newArray='';
				$implodedArray='';

       
    }
} else {
    echo "0 Duplicate results  for Blood Glucose ";
}

/******************** End Remove Blood Glucose *********************************/


?>