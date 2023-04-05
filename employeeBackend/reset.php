<?php
// require configuration file for database connection
require './config.php';

// Set headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Method: GET, POST');
header('Access-Control-Allow-Headers: *');

// Fetch data from client
$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
	$decodedData = json_decode($data);

	// Set variables
	$username = $decodedData->Username;
	$password = $conn->cubrid_real_escape_string($decodedData->User_Password);

	// Create new sql statement
	$sql = "UPDATE credentials SET User_Password='$password' WHERE Username='$username'";

	if ($conn->query($sql) === TRUE) {
		echo json_encode('Success!');
	} else {
		echo json_encode('fail');
	}
}