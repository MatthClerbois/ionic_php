<?php
	echo $str = "<h1>Hello Woqsdqsd 5555 ///**++-@@<br>rld!</h1>";

	$newstr = filter_var($str, FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
	echo $newstr;
?>