<?php
// Include config file
require "./config.php";

// Check session for login status
if (!$_SESSION["loggedIn"]) {
    return false;
}

// Set headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');

// Create sql statement
$sql = "SELECT * FROM `job` WHERE `Job_Status`='Active'";
if ($stmt = mysqli_prepare($conn, $sql)) {
    // Attempt to execute statement
    if (mysqli_stmt_execute($stmt)) {
        $jobs = array();
        // Store result 
        mysqli_stmt_store_result($stmt, $jobs);
        mysqli_stmt_close($stmt);
        mysqli_close($stmt);
        return json_encode($jobs);
    }
    mysqli_stmt_close($stmt);
    mysqli_close($stmt);
    return false;
}