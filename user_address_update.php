<?php
	
// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db
$db = new DB_CONNECT();

// check for post data
$data = json_decode(file_get_contents("php://input"));

$get_address_id = mysql_real_escape_string($data->address_id);
$get_street = mysql_real_escape_string($data->street);
$get_landmark = mysql_real_escape_string($data->landmark);
$get_city = mysql_real_escape_string($data->city);
$get_state = mysql_real_escape_string($data->state);
$get_pincode = mysql_real_escape_string($data->pincode);
$get_country = mysql_real_escape_string($data->country);
$get_mobile = mysql_real_escape_string($data->mobile);
$get_address_type = mysql_real_escape_string($data->address_type);

if(empty($get_address_id) || empty($get_street) || empty($get_landmark) || empty($get_city) || empty($get_state) || empty($get_pincode) 
|| empty($get_country) || empty($get_mobile) || empty($get_address_type))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{		
	// get all news
	$result = mysql_query("UPDATE customer_address SET street='$get_street', landmark='$get_landmark', city='$get_city', state='$get_state', 
							pincode='$get_pincode', country='$get_country', mobile='$get_mobile', address_type='$get_address_type'
							WHERE address_id = '$get_address_id'");
		
	// check for empty result
	if ($result)
	{
		// success	
		$response["success"] = 1;
						
		// echoing JSON response
		echo json_encode($response);
	} 
	else
	{
		$response["success"] = 0;	
		echo json_encode($response);
	}
}
?>