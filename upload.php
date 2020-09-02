<?php 
// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db
$db = new DB_CONNECT();

$data = json_decode(file_get_contents("php://input"));
$get_id_1 =$_POST['cook_product_id'];
$get_type =$_POST['type'];
//$get_id = substr($get_id_1, 1, -1);

if (!empty( $_FILES ))
{
	
	$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $target_dir = "uploads/";
	$uploadPath = $target_dir . basename($_FILES[ 'file' ][ 'name' ]);
	$imageFileType = pathinfo($uploadPath,PATHINFO_EXTENSION);
	
    $get_file = "http://localhost:8080/projects/book/website/uploads/".$_FILES[ 'file' ][ 'name' ]."";
	
	if (strcmp($get_type ,"First" )==0)
	{
	
	$result = mysql_query("UPDATE product_list SET pimage='$get_file' WHERE product_id='$get_id_1' ");
	}
	else if(strcmp($get_type ,"Price" )==0){
			$result = mysql_query("UPDATE product_list SET pimage_2='$get_file' WHERE product_id='$get_id_1' ");

	}
	else if(strcmp($get_type ,"Back" )==0){
			$result = mysql_query("UPDATE product_list SET pimage_3='$get_file' WHERE product_id='$get_id_1' ");

	}
	else{
		null;
	}
	// check for empty result
	if($result)
	{
		move_uploaded_file( $tempPath, $uploadPath );
		// success
		$answer = array( 'answer' => 'File transfer completed' );
		$json = json_encode( $answer );

		echo $json;
	}
	else 
	{
		 echo 'No files';
	}
} 
else 
{
    echo 'No files';
}

?>