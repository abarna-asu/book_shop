var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookieStore, $cookies, $http) 
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
/************************** View All Orders ********************************/
/****************************************************************************/

		$http.post('myorders_get.php',{'email': $scope.log_user_email})
		.success(function(data, status, headers, config)
		{
			if(data.success == 1)
			{
				$scope.orders = data.orders;			
			}
			else if(data.success == 0)
			{
				$scope.err_orders = "No Orders Found!!!";
			}
			else
			{
				alert("Pls fill all fields");
			}
		});
		
	$scope.send_wallet= function(product_id) 
	{
		$http.post('send_wallet.php',{
			'product_id': product_id,'email':$scope.log_user_email})	
		.success(function(data, status, headers, config)
		{
			if(data.success == 1)
			{
				alert("Wallet Payment successful");
				window.location = "account.html";
				return;
			}
			else if(data.success == 2)
			{
				alert("Low Wallet Balance");
			}
			else
			{
				alert("Added successful");
				window.location = "order.html";
				return;
			}
		});
	}
		

});