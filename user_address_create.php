<?php
	
// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db
$db = new DB_CONNECT();

$data = json_decode(file_get_contents("php://input"));
$get_cus_email = mysql_real_escape_string($data->email);
$get_street = mysql_real_escape_string($data->street);
$get_landmark = mysql_real_escape_string($data->landmark);
$get_city = mysql_real_escape_string($data->city);
$get_state = mysql_real_escape_string($data->state);
$get_pincode = mysql_real_escape_string($data->pincode);
$get_country = mysql_real_escape_string($data->country);
$get_mobile = mysql_real_escape_string($data->mobile);
$get_address_type = mysql_real_escape_string($data->address_type);

if(empty($get_cus_email) || empty($get_street) || empty($get_landmark) || empty($get_city) || empty($get_state) || empty($get_pincode) 
|| empty($get_country) || empty($get_mobile) || empty($get_address_type))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result = mysql_query("SELECT * FROM customer_details WHERE email = '$get_cus_email'");
	if(mysql_num_rows($result))
	{
		$Alldetails = mysql_fetch_array($result);
		// temp user array
		$get_customer_id = $Alldetails["customer_id"];
		
		// get customer 
		$result1 = mysql_query("INSERT INTO customer_address(customer_id, street, landmark, city, state, pincode, country, mobile, address_type)
		VALUES('$get_customer_id', '$get_street', '$get_landmark', '$get_city', '$get_state','$get_pincode', '$get_country', '$get_mobile', '$get_address_type')");

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
	else
	{
		$response["success"] = 0;	
		echo json_encode($response);
	}
}
?>