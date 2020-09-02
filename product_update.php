<?php


/* Following code will edit table by referring id */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db
$db = new DB_CONNECT();
$data = json_decode(file_get_contents("php://input"));
$get_product_id = mysql_real_escape_string($data->product_id);
$get_pname = mysql_real_escape_string($data->pname);
$get_desc = mysql_real_escape_string($data->description);
$get_price = mysql_real_escape_string($data->price);
$get_category1 = mysql_real_escape_string($data->category1);
$get_category2 = mysql_real_escape_string($data->category2);
$get_size = mysql_real_escape_string($data->size);
$get_stock =mysql_real_escape_string($data->stock);
$get_spec = mysql_real_escape_string($data->specification);
$get_ship_days = mysql_real_escape_string($data->shipping_days);
$get_ship_charge =mysql_real_escape_string($data->shipping_charge);



$result = mysql_query("UPDATE product_list SET pname='$get_pname',description='$get_desc', price='$get_price',size='$get_size', stock='$get_stock', specification='$get_spec',
				shipping_days='$get_ship_days', shipping_charge='$get_ship_charge'
				WHERE 	product_id = '$get_product_id'");

	
// check for empty result
if($result)
{
	// success
	$response["success"] = 1;
	$response["message"] = "Entity successfully created";
	echo json_encode($response);
	
	// success	
	//header('Location: reg_del.html');
} 
else 
{
	echo "Error in inserting data";
}
?>