<?php

/*$get_price = 16000;
				$get_tax = 2;
				$get_ship_charge = 0;
				
$get_tax_amount = $get_price * ($get_tax / 100);
$get_grand_total = $get_tax_amount + $get_ship_charge + $get_price;
echo $get_grand_total;
echo $get_tax_amount;*/
$get_cart_quantity = 1;

$get_pro_price = 8000;
			$get_pro_tax = 2;
			$get_pro_ship_charge = 0;
			
$quantity = $get_cart_quantity + 1;
			$pro_tax = $quantity * $get_pro_tax;
			$get_pro_tax_amount = $get_pro_price * ($pro_tax / 100);
			$get_pro_net_total = $get_pro_tax_amount + $get_pro_ship_charge + $get_pro_price;
			
			echo $get_pro_net_total;
echo $get_pro_tax_amount;
echo $pro_tax;
echo $quantity;

?>