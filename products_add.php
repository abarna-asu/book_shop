<?php
	
// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db
$db = new DB_CONNECT();
$data = json_decode(file_get_contents("php://input"));
$get_email =  mysql_real_escape_string($data->email);
$get_pname =  mysql_real_escape_string($data->pname);
$get_price = mysql_real_escape_string($data->price);
$get_desc = mysql_real_escape_string($data->description);
$get_size = mysql_real_escape_string($data->size);
$get_stock = mysql_real_escape_string($data->stock );
$get_speci =  mysql_real_escape_string($data->specification );
$get_ship_days = mysql_real_escape_string($data->shipping_days );
$get_ship_charge = mysql_real_escape_string($data->shipping_charge );
$get_category1 = mysql_real_escape_string($data->category1); 
$get_category2 = mysql_real_escape_string($data->category2);

 
$get_field_1 = mysql_real_escape_string($data->field_1);
$get_field_2 = mysql_real_escape_string($data->field_2);
$get_field_3 = mysql_real_escape_string($data->field_3);
$get_field_4 = mysql_real_escape_string($data->field_4);
$get_field_5 = mysql_real_escape_string($data->field_5);
$get_total = $get_field_1 +$get_field_2+$get_field_3+$get_field_4+$get_field_5;

$get_current_year = date('Y');
$year_diff = $get_current_year - $get_category1;
$get_new_price =  $get_price - ($year_diff  * 10)  ;

$get_new_price = ($get_new_price - ($get_price * ($get_total/100) ));

$get_field_6 = $get_new_price / 20;  // Rs20 - 1 credits

$get_crea_date = date('m/d/Y');

	$result = mysql_query("INSERT INTO product_list
					(pname, description, price, size, stock, specification, 
					shipping_days,shipping_charge, category1, category2,category3,field_1,created_date) 
			VALUES('$get_pname', '$get_desc', '$get_new_price','$get_size', '$get_stock', 
			'$get_speci', '$get_ship_days', '$get_ship_charge', 
			'$get_category1', '$get_category2', '$get_email','$get_field_6',
			'$get_crea_date')");
		
		if($result)
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