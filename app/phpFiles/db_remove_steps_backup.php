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

$current_year=date("Y");
//$current_year='2017';
$c_month=date('m');


/******************************** Remove duplicate steps ******************************************/

$sql = "SELECT startTime, userID  FROM step where  YEAR(startTime) = '$current_year' and MONTH(startTime) = '$c_month' 
GROUP BY startTime, userID HAVING COUNT(startTime) > 1  AND COUNT(userID) > 1 "; 
$result = $conn->query($sql); 

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {


				 $id_array=array();

				 $sql1 = "select stepID from step where startTime='".$row['startTime']."' and userID='".$row['userID']."'";

				 $result1 = $conn->query($sql1); 
				 while($row1 = $result1->fetch_array()){

				 	$id_array[]=$row1['stepID'];  
				 }  

                
				$newArray = array_shift($id_array);
				$implodedArray = implode(",", $id_array);  
                
				/* start delete  */
				        //$sql2 = "update step set isdeleted=1 WHERE stepID IN (".$implodedArray.")"; 
					    $sql2 = "DELETE FROM step WHERE stepID IN (".$implodedArray.")"; 
					   
						if ($conn->query($sql2) === TRUE) {
						//echo "Record deleted successfully.<br>"; 
						} else {
						echo "Error deleting record: " . $conn->error; 
						}

						/* End Delete */

				unset($id_array);
				$newArray='';
                $implodedArray='';
       
    }
} else {
    echo "0 Duplicate results for Step <br>";
}

//////////////////////convert isdeleted 1 to 0
$sql = "SELECT stepID FROM step where  YEAR(startTime) = '$current_year' and MONTH(startTime) = '$c_month'  and  isdeleted=1 "; 
$result = $conn->query($sql); 

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $row_step_id=$row['stepID'];
          $c_array[]=$row_step_id;				 
  				/* start delete  */
				         
					    $sql2="UPDATE `umch`.`step` SET `isdeleted`='0' WHERE `stepID`='$row_step_id'";
                       
						if ($conn->query($sql2) === TRUE) { 
						//echo "Record Updated successfully.<br>"; 
						} else {
						echo "Error Updated record: " . $conn->error; 
						}
						/* End Delete */

			 
       
    }
} else {  
    echo "0 Is deleted results for Step <br>";
}

if(!empty($c_array)){
echo count($c_array);
}
echo '<br>';
echo 'Done';

$conn->close();


?>