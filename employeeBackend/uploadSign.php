<?php
// Include configuration file for database
require "./config.php";

// Check session for login status
if (!$_SESSION["loggedIn"]) {
    return false;
}

// Set headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');

// Fetch data from client
$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $decodedData = json_decode($data, true);

    // Set variables 
    $employee_ID = $decodedData['employeeID'];
    $Permit_Number = $decodedData['formVersionNum'];
    $SignatureData = $decodedData['signature'];

    // Create sql statement
    $sql = "INSERT INTO `permit_signature` (employee_ID, Permit_Number, SignatureData) VALUES ('$employee_ID', '$Permit_Number', '$SignatureData')";
    if ($stmt = mysqli_prepare($conn, $sql)) {
        // Bind variables to prepared statement
        mysqli_stmt_bind_param($stmt, "iib", $employee_ID, $Permit_Number, $SignatureData);

        // Attempt to execute statement
        if (mysqli_stmt_execute($stmt)) {
            // Store result
            mysqli_stmt_store_result($stmt);
            mysqli_stmt_close($stmt);
            mysqli_close($stmt);
            return true;
        }
        mysqli_stmt_close($stmt);
        mysqli_close($stmt);
        return false;
    }
}