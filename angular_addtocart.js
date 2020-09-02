var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookies, $cookieStore, $http) 
{
/****************************************************************************/
/************************** User Login *************************************/
/****************************************************************************/
	
	// sign in button
	$scope.user_login = function() 
	{		
        $http.post('user_login.php', {'email': $scope.log_email, 'password':$scope.log_password})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Login Successful");
				$cookieStore.put("log_user_email",$scope.log_email);
				window.location = "index.html";  // Home Page
				return;				
			}
			else if(data.success == 0)
			{
				alert("Login Unsuccessful");
			}
			else
			{
				alert("Pls fill all fields");
			}
        });
    }
	
/****************************************************************************/
/************************** User Logout ************************************/
/****************************************************************************/		
	$scope.user_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.log_user_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}
	
/****************************************************************************/
/************************** User Details ***********************************/
/****************************************************************************/	
	$scope.log_user_email = $cookieStore.get("log_user_email");
	
	if(document.cookie == "")
	{
		$scope.myLoginVar = false;
		$scope.myLogoutVar = true;
		$scope.myAccountVar = true;
		$scope.myOrdersVar = true;
		$scope.myCartVar = true;
	}
	else if(!$cookies.log_user_email)
	{
		$scope.myLoginVar = false;
		$scope.myLogoutVar = true;
		$scope.myAccountVar = true;
		$scope.myOrdersVar = true;
		$scope.myCartVar = true;
	}
	else
	{
		$scope.myLoginVar = true;
		$scope.myLogoutVar = false;
		$scope.myAccountVar = false;
		$scope.myOrdersVar = false;
		$scope.myCartVar = false;
	}
	
/****************************************************************************/
/************************** View All cart ***********************************/
/****************************************************************************/
	// All cart
	if($scope.myLoginVar == false)
	{
	alert("Login to Continue");
	}
	else if($scope.log_user_email == "")
	{
		alert("Login to Continue");
	}
	else
	{
		$http.post('cart_get.php',{'email':$scope.log_user_email})
		.success(function (data, status, headers, config) 
		{
			if(data.success == 1)
			{
				$scope.myCartVar = false;
				$scope.cart_products = data.cart;
				$scope.price_details = data.details;
			}
			else
			{
				$scope.myCartVar = true;
				$scope.err_cart = "No Products Found";
			}
		});
	}

/*****************************************************************************/
/************************** Delete Products *********************************/
/****************************************************************************/
	// products_delete
	$scope.cart_delete = function(cart_id) 
	{		
        $http.post('cart_delete.php', {'cart_id': cart_id})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Cart Deleted Successful");
				window.location = "bag.html";
				return;
			}
			else if(data.success == 2)
			{
				alert("No cart id found");
			}
			else
			{
				alert("Error While Deleting Cart!!");
			}
        });
    }
	
/*****************************************************************************/
/************************** Update cart **************************************/
/****************************************************************************/

	$scope.bag_edit = function(cart_id,cart_pname) 
	{
		$cookieStore.put("cart_id",cart_id);
		$cookieStore.put("cart_pname",cart_pname);
		window.location = "bagedit.html";
		return;
	}
	$scope.cart_id = $cookieStore.get("cart_id");
	$scope.cart_pname = $cookieStore.get("cart_pname");
	//products_cart
	$scope.cart_update = function() 
	{		
        $http.post('cart_update.php', {'quantity': $scope.cart_quantity,'cart_id': $scope.cart_id})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Cart Updated Successful");
				window.location = "bag.html";
				return;
				
			}
			else if(data.success == 0)
			{
				alert("Error While Updating Cart!!");
			}
			else
			{
				alert("No cart id found");
			}
        });
    }

/*****************************************************************************/
/************************** edit button **************************************/
/*****************************************************************************/

	$scope.pay = function() 
	{
		$cookieStore.put("cart_id",cart_id);
		$cookieStore.put("cart_pname",cart_pname);
		window.location = "bagedit.html";
		return;
	}
	

/*****************************************************************************/
/************************** Place Order button********************************/
/****************************************************************************/

	//place order
	$scope.place_order = function() 
	{		
        $http.post('cart_place_order.php', {'email': $scope.log_user_email})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Order Created Successfully");
				window.location = "order.html";
				return;
				
			}
			else if(data.success == 0)
			{
				alert("Error in placing order");
			}
			else
			{
				alert("Please fill all fields");
			}
        });
    }
	
/*****************************************************************************/
/************************** Place order button********************************/
/*****************************************************************************/
//	$scope.info_place_id = $cookieStore.get("info_place_id");
	$scope.p_id = $cookieStore.get("p_id");

	$scope.info_pay = function() 
	{
		$cookieStore.put("info_place_id",$scope.p_id);
		window.location = "pay.html";
		return;
	}
});