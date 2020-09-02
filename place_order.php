<?php
	
// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db
$db = new DB_CONNECT();

$data = json_decode(file_get_contents("php://input"));
$get_cus_email = mysql_real_escape_string($data->email);
$get_product_id = mysql_real_escape_string($data->place_id);

if(empty($get_cus_email) || empty($get_product_id))
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
		
		$result1 = mysql_query("SELECT * FROM customer_address WHERE customer_id = '$get_customer_id'");
		$result2 = mysql_query("SELECT * FROM product_list WHERE product_id='$get_product_id'");
		if(mysql_num_rows($result1) && mysql_num_rows($result2))
		{
			$Alladdress = mysql_fetch_array($result1);
			$get_street = $Alladdress["street"];
			$get_landmark = $Alladdress["landmark"];
			$get_city = $Alladdress["city"];
			$get_state = $Alladdress["state"];
			$get_pincode = $Alladdress["pincode"];
			$get_country = $Alladdress["country"];
			
			$AllProducts = mysql_fetch_array($result2);
			$get_product_id = $AllProducts["product_id"];
			$get_pname = $AllProducts["pname"];
			$get_pimage = $AllProducts["pimage"];
			$get_description = $AllProducts["description"];
			$get_price = $AllProducts["price"];
			$get_tax = $AllProducts["tax_amount"];
			$get_shipping_charge = $AllProducts["shipping_charge"];
			
			$get_tax_amount = $get_price * ($get_tax / 100);
			$get_net_total = $get_price + $get_tax_amount + $get_shipping_charge;
			$get_address = ''.$get_street.','.$get_landmark.','.$get_city.','.$get_state.','.$get_pincode.','.$get_country.'';
			$get_created_date = date('Y-m-d');
			$get_status = 'Pending';
			$get_quantity = 1;
			
			// get customer 
			$result3 = mysql_query("INSERT INTO my_order(customer_id, product_id, pname, pimage, description, quantity, net_total, shipping_address, billing_address, created_date, status)
			VALUES('$get_customer_id', '$get_product_id', '$get_pname', '$get_pimage', '$get_description','$get_quantity', '$get_net_total', '$get_address', '$get_address', '$get_created_date', '$get_status')");

			// check for empty result
			if($result3)
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
}
?>