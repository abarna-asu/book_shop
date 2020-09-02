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

	$result1 = mysql_query("SELECT * FROM customer_details WHERE email = '$get_email'");		
	if(mysql_num_rows($result1))
	{
		$response["address"] = array();
		while($Alladdress = mysql_fetch_array($result1))
		{
			$address = array();
			$address = $Alladdress; // View All Address Fields
			array_push($response["address"],$address);
		}
		$response["success"] = 1;
		echo json_encode($response);
	}	
	else
	{
		$response["success"] = 0;	
		echo json_encode($response);
	}
?>