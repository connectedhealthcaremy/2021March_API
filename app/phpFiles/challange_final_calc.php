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

$user_id=$params[0];
$challenge_id=$params[1];
 
 ///$user_id=$user_id;
////$challenge_id=$challengeID;

$sql="select a.* , b.week_number
from 
(SELECT DISTINCT week(weekStartDate) as week_number, challengeScore.*, challenges.consective_number_weeks FROM WeHealthDB.challengeScore
inner join challenges on challengeScore.challengeID=challenges.challengeID
where challengeScore.userID='$user_id' and challengeScore.challengeID='$challenge_id') a
LEFT JOIN 
(SELECT DISTINCT week(weekStartDate) as week_number, challengeScore.*, challenges.consective_number_weeks FROM WeHealthDB.challengeScore
inner join challenges on challengeScore.challengeID=challenges.challengeID
where challengeScore.userID='$user_id' and challengeScore.challengeID='$challenge_id') b
on a.week_number=b.week_number";

$result = $conn->query($sql);
while ($row=$result->fetch_assoc()) { $records[] = $row; }

//////


$array_consective= array();
$consective_number_weeks=$records[0]['consective_number_weeks'];
$achievedPoints=$records[0]['achievedPoints'];
$totalPoints=$records[0]['totalPoints'];

foreach ($records as $value) {
  array_push($array_consective, $value['week_number']);
}


function GetRanges( $aNumbers ) {
  $aNumbers = array_unique( $aNumbers );
  sort( $aNumbers );
  $aGroups = array();
  for( $i = 0; $i < count( $aNumbers ); $i++ ) {
    if( $i > 0 && ( $aNumbers[$i-1] == $aNumbers[$i] - 1 ))
      array_push( $aGroups[count($aGroups)-1], $aNumbers[$i] );
    else
      array_push( $aGroups, array( $aNumbers[$i] )); 
  }
  return $aGroups;
}

$consective_ranges=GetRanges( $array_consective );
array_multisort($result = array_map('count', $consective_ranges), SORT_DESC);


if(!empty($result[0])){

$achievedPoints=$achievedPoints*$result[0];
$totalPoints=$records[0]['totalPoints'];


if($result[0] >= $consective_number_weeks){ //goal achieved

$sql = "DELETE FROM challengeScoreFinal WHERE challengeID='$challenge_id' and userID='$user_id'";
$conn->query($sql) ;

$sql="select * from challengeScoreFinal where challengeID='$challenge_id' and userID='$user_id' and status = 1";
$result_query = $conn->query($sql);
if($result_query->num_rows > 0){} else {
$sql = "INSERT INTO challengeScoreFinal (challengeID, userID, status, points, totalPonts) VALUES ('$challenge_id', '$user_id', '1', '$achievedPoints', '$totalPoints')";
$conn->query($sql) ;
}

}
else
{

  $sql = "DELETE FROM challengeScoreFinal WHERE challengeID='$challenge_id' and userID='$user_id'";
    $conn->query($sql) ;
    
    $sql = "INSERT INTO challengeScoreFinal (challengeID, userID, status, points, totalPonts) VALUES ('$challenge_id', '$user_id', '0', '$achievedPoints', '$totalPoints')";
    $conn->query($sql) ;

} }

echo 'done successfully';



?>