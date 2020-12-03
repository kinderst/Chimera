<?php
	/*CHIMERA RESTAURANT
	Php page to email host@chimera.restaurant from the 'Contact' page on the website as of 5/12/2018
	*/
	//if params are set and request method is a post
	if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["subject"]) && isset($_POST["message"]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
		//$sanitizedEmail = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);

		$to = 'host@chimera.restaurant';
		$subject = 'Contact Page Notification';
		$message = 'contact name: ' . $_POST["name"] . ', contact subject: ' . $_POST["subject"] . ', contact message: ' . $_POST["message"] . ', contact email: '  . $_POST["email"];
		//Makes it appear as if actual email is coming from given email address (security risk)
		//$headers = 'From: ' . $sanitizedEmail;
		//Makes it appear as email is coming from chimer12@ecbiz224.inmotionhosting.com
		$headers = '';
		mail($to, $subject, $message, $headers);
	}
?>