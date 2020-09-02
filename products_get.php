<?php


/* Following code will retrieve table values */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db
$db = new DB_CONNECT();
	

// get all jobs
$result = mysql_query("SELECT * FROM product_list ");

if (mysql_num_rows($result))
{
	$response["products"] = array();
	$response["category"] = array();
	$response1 = array();
	$project = array();
	while($AllProducts = mysql_fetch_array($result))
	{
		// temp user array
		$products = array();
		$products = $AllProducts;
		array_push($response["products"],$products);

		$project = $AllProducts["category1"];
		array_push($response1,$project);
	
	}
	
	$result1 = array_count_values($response1);

	$cat = array_keys($result1);
	
	$len = count($cat);
	$i=0;
	$response['category']= array();
	while($i<$len)
	{		
		$category=array();
		$category["category"] = $cat[$i];
		$i++;
		
		array_push($response["category"],$category);
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