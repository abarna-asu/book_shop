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
		$scope.myaddVar = true;
		$scope.myproductVar = true;
		$scope.myLogoutVar = true;
		$scope.myAccountVar = true;
		$scope.myOrdersVar = true;
		$scope.myCartVar = true;
	}
	else if(!$cookies.log_user_email)
	{
		$scope.myLoginVar = false;
		$scope.myproductVar = true;
		$scope.myaddVar = true;
		$scope.myLogoutVar = true;
		$scope.myAccountVar = true;
		$scope.myOrdersVar = true;
		$scope.myCartVar = true;
	}
	else
	{
		$scope.myLoginVar = true;
		$scope.myproductVar = false;
		$scope.myaddVar = false;
		$scope.myLogoutVar = false;
		$scope.myAccountVar = false;
		$scope.myOrdersVar = false;
		$scope.myCartVar = false;
	}
	
/****************************************************************************/
/************************** View All Products *******************************/
/****************************************************************************/
	$scope.addproducts = function() 
	{		
		if($scope.myaddVar == true)
		{
		alert("Login to Continue");
		}
		else if($scope.log_user_email == "")
		{
			alert("Login to Continue");
		}
		else
		{
			window.location = "add_product.html";
			return;
		}
	}
	
		$scope.myproduct = function() 
		{		
			if($scope.myproductVar == true)
			{
			alert("Login to Continue");
			}
			else if($scope.log_user_email == "")
			{
				alert("Login to Continue");
			}
			else
			{
				window.location = "admin_view.html";
			}
		}
		
		$http.post('myproducts_get.php',{'email':$scope.log_user_email})
		.success(function(data, status, headers, config)  
		{
			$scope.myproducts = data.details;
		});

/***************ADD Products**********************************************/
/****************************************************************************/
/**************************************************************************************/
	$scope.add_product= function() 
	{
		$http.post('products_add.php',{
			'pname': $scope.pname, 'description':$scope.description,'price':$scope.price,
			'size':$scope.size,'stock':$scope.stock,'specification':$scope.specification,
			'shipping_days':$scope.shipping_days,
			'shipping_charge':$scope.shipping_charge,'category1':$scope.category1,
			'category2':$scope.category2,'field_1':$scope.field_1,'field_2':$scope.field_2,
			'field_3':$scope.field_3,'field_4':$scope.field_4,'field_5':$scope.field_5,
			'email':$scope.log_user_email})	
		.success(function(data, status, headers, config)
		{
			if(data.success == 1)
			{
				alert("Added successful");
				window.location = "admin_view.html";
				return;
			}
			else
			{
				alert("Added successful");
				window.location = "admin_view.html";
				return;
			}
		});
	}
	
	/*****************************************************************************/
/************************** Update Products *********************************/
/****************************************************************************/
$scope.myVar = true;
	$scope.edit = function(product_id,pname,description,price,size,
							stock,specification,shipping_days,shipping_charge,category1,category2) 
	{
		$scope.myVar = false;
		$scope.product_id = product_id;
		$scope.pname = pname;
		$scope.description = description;
		$scope.price = price;
		$scope.size = size;
		$scope.stock = stock;
		$scope.specification = specification;
		$scope.shipping_days = shipping_days;
		$scope.shipping_charge = shipping_charge;
		$scope.category1 = category1;
		$scope.category2 = category2;
	}
	/****************************************************************************/
/************************** save data ***********************************/
/****************************************************************************/
	$scope.product_save = function() 
	{
	$http.post('product_update.php', {
			'product_id': $scope.product_id,'pname': $scope.pname, 
			'description':$scope.description,'price':$scope.price,'size':$scope.size,
							'stock':$scope.stock,'specification':$scope.specification,
							'shipping_days':$scope.shipping_days,'shipping_charge':$scope.shipping_charge,'category1':$scope.category1,'category2':$scope.category2	})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			alert(" Updated Successfully");					
			window.location = "admin_view.html";
			return;
		}
		else
		{
			alert("Error in updating");						
		}
								
    });
	}
	
	$scope.pro_del= function(product_id) 
	{		
        $http.post('delete.php', 
		{
		'product_id': product_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Product Deleted Successful");
				window.location = "admin_view.html";
				return;
			}
			else
			{
				alert("No id found");
			}
        });
    }


		$scope.image_update = function(product_id) 
			{
				$cookieStore.put("cook_product_id",product_id);
				window.location = "file.html";
				return;
			}
		$scope.cook_product_id = $cookieStore.get("cook_product_id");
	

	//$scope.product_name = $cookieStore.get("product_name");
	//,{'product':$scope.product_name}
	$http.post('products_get.php')
	.success(function(data, status, headers, config)  
	{
		if(data.success == 1)
		{
			$scope.products = data.products;
			$scope.category = data.category;
		}
		else
		{
			$scope.er_list = "No Products Found !!!";
		}
	});
	
/****************************************************************************/
/************************** View Product Info *******************************/
/****************************************************************************/	

	$scope.product_details = function(p_id)
	{
		$cookieStore.put("p_id",p_id);
		window.location="productinfo.html";
		return;
	}

	$scope.p_id = $cookieStore.get("p_id");	
	$http.post('product_info.php',{'product_id':$scope.p_id})
	.success(function(data, status, headers, config)  
	{
		if(data.success == 1)
		{
			$scope.product_info = data.products;
		}
		else
		{
			$scope.er_list = "No Product Details Found !!!";
		}
	});
		
/****************************************************************************/
/************************** View Product Info *******************************/
/****************************************************************************/	

	$scope.sold_order = function(p_id)
	{
		$cookieStore.put("p_id",p_id);
		window.location="sold_info.html";
		return;
	}

	$scope.p_id = $cookieStore.get("p_id");	
	$http.post('sold_info.php',{'product_id':$scope.p_id})
	.success(function(data, status, headers, config)  
	{
		if(data.success == 1)
		{
			$scope.sold_info = data.products;
		}
		else
		{
			$scope.er_list = "No Product Details Found !!!";
		}
	});
		
/****************************************************************************/
/************************** Delete Products *********************************/
/****************************************************************************/
	// products_delete
	$scope.product_delete = function(product_id) 
	{		
        $http.post('products_delete.php', 
		{
		'product_id': product_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Product Deleted Successful");
				window.location = "products.html";
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Product!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }
	
/*****************************************************************************/
/************************** Update Products *********************************/
/****************************************************************************/

	$scope.product_edit = function(product_id,pname,pimage,description,price,offer,size,
							stock,specification,tax_amount,shipping_days,shipping_charge,cat_name,category1,category2,category3,category4 ) 
	{
		$scope.product_id = product_id;
		$scope.pname = pname;
		$scope.pimage = pimage;
		$scope.description = description;
		$scope.price = price;
		$scope.offer = offer;
		$scope.size = size;
		$scope.stock = stock;
		$scope.specification = specification;
		$scope.tax_amount = tax_amount;
		$scope.shipping_days = shipping_days;
		$scope.shipping_charge = shipping_charge;
		$scope.cat_name = cat_name;
		$scope.category1 = category1;
		$scope.category2 = category2;
		$scope.category3 = category3;
		$scope.category4 = category4;	
	}
	
/*****************************************************************************/
/************************** Product Category *********************************/
/****************************************************************************/

	$http.post('category_get.php',{'product':$scope.product_name})
	.success(function(data, status, headers, config)  
	{
		if(data.success == 1)
		{
			$scope.category = data.category;
			$scope.types = data.types;
			$scope.brand = data.brand;
			$scope.size = data.size;
			$scope.offers = data.offers;
		}
		else
		{
			$scope.er_list = "No Products Found !!!";
		}
	});
	
	$scope.cat_filter = function() 
	{	
		$scope.cat = document.getElementById('category').value;
		alert($scope.cat);
		$cookieStore.put("category",$scope.cat);
	}
	$scope.category = $cookieStore.get("category");

/*****************************************************************************/
/************************** Add to Cart **************************************/
/*****************************************************************************/
	$scope.p_id = $cookieStore.get("p_id");
	//cart_add
	$scope.addtocart = function() 
	{		
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
			$http.post('cart_add.php', {'product_id': $scope.p_id, 'email':$scope.log_user_email})
			.success(function(data, status, headers, config) 
			{
				if(data.success == 1)
				{
					alert("Cart Added Successful");
					window.location = "bag.html";
					return;
					
				}
				else if(data.success == 0)
				{
					alert("Error in Adding Cart");
				}
				else if(data.success == 2)
				{
					alert("No Id Found");
				}
				else
				{
					alert("No  Found");
				}
			});
		}
	}
	
/*****************************************************************************/
/************************** Place order button********************************/
/*****************************************************************************/
	$scope.info_place_id = $cookieStore.get("info_place_id");

	$scope.info_pay = function() 
	{
		$cookieStore.put("info_place_id",$scope.p_id);
		window.location = "pay.html";
		return;
	}
/********************************* checkbox *************************************/	
	$scope.selection=[];
	// toggle selection for a given employee by name
	$scope.toggleSelection = function toggleSelection(category)
	{
		var idx = $scope.selection.indexOf(category);
		// is currently selected
		if (idx > -1) 
		{
			$scope.selection.splice(idx, 1);
		}
		// is newly selected
		else 
		{
			$scope.selection = category;
		}
	};
	$scope.toggle = function toggle(category)
	{
		var idx = $scope.selection.indexOf(category);
		// is currently selected
		if (idx > -1) 
		{
			$scope.selection.splice(idx, 1);
		}
		else
		{
			$scope.selection = "";
		}
	}
	
});