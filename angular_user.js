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
/************************** User Register **********************************/
/****************************************************************************/
	$scope.er_email = true;
	// mobile number verification
	$scope.register_email = function()
	{
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if(filter.test($scope.reg_email))
		{
			$scope.er_email = true;
			$scope.btn_sgnup = false;
			$scope.btn_sgnin = false;
		}
		else
		{
			$scope.er_email = false;
			$scope.btn_sgnup = true;
			$scope.btn_sgnin = true;
		}
	}
	// mobile number verification
	$scope.login_email = function()
	{
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if(filter.test($scope.log_email))
		{
			$scope.er_email = true;
			$scope.btn_sgnup = false;
			$scope.btn_sgnin = false;
		}
		else
		{
			$scope.er_email = false;
			$scope.btn_sgnup = true;
			$scope.btn_sgnin = true;
		}
	}
	
	$scope.er_mob = true;
	// mobile number verification
	$scope.mobile_no = function()
	{
		var filter = /^\d{10}$/;
		if(filter.test($scope.reg_mobile))
		{
			$scope.er_mob = true;
			$scope.btn_sgnup = false;
		}
		else
		{
			$scope.er_mob = false;
			$scope.btn_sgnup = true;
		}
	}
	// sign up button
	$scope.user_register = function() 
	{		
		$http.post('user_register.php', {'fname': $scope.reg_fname, 'lname':$scope.reg_lname, 'email':$scope.reg_email, 'password': $scope.reg_password, 'mobile': $scope.reg_mobile})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Registered Successfully");
				window.location = "index.html";
				return;				
			}
			else if(data.success == 0)
			{
				alert("Invalid Inputs");
			}
			else if(data.success == 2)
			{
				alert("Pls fill all fields");
			}
			else
			{
				alert("Email already exists!!!");
			}
        });
    }
	
/****************************************************************************/
/************************** User Register Verification *********************/
/****************************************************************************/
	$scope.reg_user_email = $cookieStore.get("reg_user_email");
	
	// otp submit button
	$scope.user_verification = function() 
	{		
	   $http.post('user_verification.php', {'email': $scope.reg_user_email, 'otp':$scope.user_otp})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Registration  Successful");
				window.location = "index.html";
				return;				
			}
			if(data.success == 0)
			{
				alert("Registration  Unsuccessful");
			}
			if(data.success == 2)
			{
				alert("Pls fill all fields");
			}
        });
    }
	
/****************************************************************************/
/************************** User Details ***********************************/
/****************************************************************************/	
	$scope.log_user_email = $cookieStore.get("log_user_email");

	$http.post('user_address_get.php', {'email': $scope.log_user_email})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.user_address = data.address;
		}
		else
		{
			$scope.er_usradrs = "No Address Found !!!";
		}
    });
	
	$http.post('get_user_details.php', {'email': $scope.log_user_email})
	.success(function(data, status, headers, config) 
	{
			$scope.user_details = data.address;
    });
	
/****************************************************************************/
/************************** View All Products *******************************/
/****************************************************************************/
	// All Products
	$scope.product = function(product_name)
	{
		$cookieStore.put("product_name",product_name);
		window.location="product.html";
		return;
	}
});