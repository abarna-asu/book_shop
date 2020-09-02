<?php

/* Following register will admin login credentials */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db
$db = new DB_CONNECT();

$data = json_decode(file_get_contents("php://input"));
$get_fname = mysql_real_escape_string($data->fname);
$get_lname = mysql_real_escape_string($data->lname);
$get_email = mysql_real_escape_string($data->email);
$get_password = mysql_real_escape_string($data->password);
$get_mobile = mysql_real_escape_string($data->mobile);
$get_created_date = date('Y-m-d');

$result = mysql_query("SELECT * FROM customer_details WHERE email = '$get_email'");

if(empty($get_fname) || empty($get_lname) || empty($get_email) || empty($get_password) || empty($get_mobile) || empty($get_created_date))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else if(mysql_num_rows($result))
{
	$response["success"] = 3;	
	echo json_encode($response);
}
else
{
	// get customer 
	$result1 = mysql_query("INSERT INTO customer_details
						(fname, lname, email, password, mobile,wallet, created_date)
			VALUES('$get_fname', '$get_lname', '$get_email', '$get_password', 
					'$get_mobile','0', '$get_created_date')");

	// check for empty result
	if($result1)
	{
	
		// success
		$response["success"] = 1;
		
		// echoing JSON response
		echo json_encode($response);
	}
	else 
	{
		// unsuccess
		$response["success"] = 0;
		
		// echoing JSON response
		echo json_encode($response);
	}
}
?>