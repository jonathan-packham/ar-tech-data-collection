<?php 
// Include config file 
require "./config.php";

// Check session for login status
if ($_SESSION["loggedIn"]) {
    return false;
}

// Set headers 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');

// Get Username from client
$username = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $decodedData = json_decode($data, true);

    // Set username
    $username = $decodedData['username'];

    // Create sql statement
    $sql = "SELECT DISTINCT `c.employee_ID`, `c.Username`, `e.Employee_ID`, `e.Emp_Phone`, `e.FirstName`, `e.LastName`, `e.status`  FROM `credentials` AS `c` WHERE BINARY `Username`=? LEFT JOIN `employee` AS `e` ON `c.employee_ID`= `e.Employee_ID`";
    if ($stmt = mysqli_prepare($conn, $sql)) {
        // Bind variables to prepared statement
        mysqli_stmt_bind_param($stmt, "s", $username);

        // Attempt to execute statement
        if (mysqli_stmt_execute($stmt)) {
            $user = array();
            // Store result
            mysqli_stmt_store_result($stmt, $user);
            mysqli_stmt_close($stmt);
            mysqli_close($stmt);
            return $user;
        }
        mysqli_stmt_close($stmt);
        mysqli_close($stmt);
        return false;
    }
}