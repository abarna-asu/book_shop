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
$get_product_id = mysql_real_escape_string($data->product_id);

if(empty($get_email) || empty($get_product_id))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result1 = mysql_query("SELECT * FROM customer_details WHERE email = '$get_email'  ");
	$AllProducts1 = mysql_fetch_array($result1);		
	$get_wal_bal = $AllProducts1["wallet"];

	$result = mysql_query("SELECT * FROM product_list WHERE product_id = '$get_product_id'  ");
	$AllProducts = mysql_fetch_array($result);		
	$get_price = $AllProducts["field_1"];
	$get_seller_mail = $AllProducts["category3"];
	
	if ($get_price <= $get_wal_bal )
	{
		mysql_query("UPDATE customer_details SET wallet=wallet + '$get_price' WHERE email = '$get_seller_mail'");
		mysql_query("UPDATE customer_details SET wallet=wallet - '$get_price' WHERE email = '$get_email'");
		$response["success"] = 1;	
		echo json_encode($response);
	}
	else if($get_price >= $get_wal_bal )
	{
		
		$response["success"] = 2;	
		echo json_encode($response);
	}
	else
	{
		$response["success"] = 0;	
		echo json_encode($response);
	}
}
?>