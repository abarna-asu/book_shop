<?php

/* Following code will edit table by referring id */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db
$db = new DB_CONNECT();
$data = json_decode(file_get_contents("php://input"));
$get_id = mysql_real_escape_string($data->product_id);

$result = mysql_query("DELETE FROM 	product_list WHERE product_id = '$get_id'");
	if ($result)
	{
		$response["success"] = 1;
		echo json_encode($response);
	} 
	else
	{
		$response["success"] = 0;
		echo json_encode($response);
	} 

?>