<?php
/*********************
**** Arudhra Innovations *****
**** CPanel ******************
*********/

/* Following code will retrieve table values */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db
$db = new DB_CONNECT();

// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_email = mysql_real_escape_string($data->email);
	
if(empty($get_email))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{	
	$result = mysql_query("SELECT * FROM customer_details WHERE email = '$get_email'");
	if(mysql_num_rows($result))
	{
		$Alldetails = mysql_fetch_array($result);		
		$get_customer_id = $Alldetails["customer_id"];
			
		$result1 = mysql_query("SELECT * FROM my_order WHERE customer_id = '$get_customer_id'");		
		// check for empty result
		if (mysql_num_rows($result1))
		{	
			$response["orders"] = array();
			while($AllOrders = mysql_fetch_array($result1))
			{	
				// temp user array
				$orders = array();
				$orders  = $AllOrders;  // Add all fields to myorders
				array_push($response["orders"],$orders);	
			}		
			$response["success"] = 1;
			echo json_encode($response);
		} 
		else
		{	
			$response["success"] = 0;
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