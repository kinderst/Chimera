<?php
	/*CHIMERA RESTAURANT
	Php page to email host@chimera.restaurant from the 'Priority Seating' page on the website as of 5/12/2018
	*/
	//if params are set and request method is post
	if (isset($_POST["name"]) && isset($_POST["phone"]) && isset($_POST["email"]) && isset($_POST["partysize"]) && isset($_POST["date"]) && isset($_POST["time"]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
		//$sanitizedEmail = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
		$to = 'host@chimera.restaurant';
		$subject = 'Priority Seating Page Notification';
		$message = 'contact name: ' . $_POST["name"] . ', contact phone: ' . $_POST["phone"] . ', contact email: ' . $_POST["email"] . ', date: ' . $_POST["date"] . ', time: ' . $_POST["time"] . ', contact party size: '  . $_POST["partysize"];
		//Makes it appear as if actual email is coming from given email address (security risk)
		//$headers = 'From: ' . $sanitizedEmail;
		//Makes it appear as email is coming from chimer12@ecbiz224.inmotionhosting.com
		$headers = '';
		mail($to, $subject, $message, $headers);
	}
?>