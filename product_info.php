<?php



/* Following code will retrieve table values */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db
$db = new DB_CONNECT();
	
$data = json_decode(file_get_contents("php://input"));
$get_product_id = mysql_real_escape_string($data->product_id);

// get all jobs
$result = mysql_query("SELECT * FROM product_list WHERE product_id='$get_product_id'");

if (mysql_num_rows($result))
{
	$response["products"] = array();
	while($AllProducts = mysql_fetch_array($result))
	{
		// temp user array
		$products = array();
		$products = $AllProducts;
		array_push($response["products"],$products);
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