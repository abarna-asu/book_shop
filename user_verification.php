<?php


/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db
$db = new DB_CONNECT();

// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_email = mysql_real_escape_string($data->email);
$get_otp = mysql_real_escape_string($data->otp);

if(empty($get_email) || empty($get_otp))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result = mysql_query("SELECT * FROM customer_details WHERE email = '$get_email' AND otp = '$get_otp'");
	if(mysql_num_rows($result))
	{
		$result1 = mysql_query("UPDATE customer_details SET success = '1' WHERE email = '$get_email'");
		$response["success"] = 1;	
		echo json_encode($response);
	}
	else
	{
		$response["success"] = 0;	
		echo json_encode($response);
	}
}
?>