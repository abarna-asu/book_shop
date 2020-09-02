<?php
/*****************************
**** Arudhra Innovations *****
**** CPanel ******************
*****************************/


/* Following code will retrieve table values */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db
$db = new DB_CONNECT();
	
$data = json_decode(file_get_contents("php://input"));
$get_email =mysql_real_escape_string($data->email);

// get all jobs
$result = mysql_query("SELECT * FROM product_list  where category3='$get_email' ");

if (mysql_num_rows($result))
{
	$response["details"] = array();
	$project = array();
	while($AllProducts = mysql_fetch_array($result))
	{
		// temp user array
		$details = array();
		$details = $AllProducts;
		array_push($response["details"],$details);
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