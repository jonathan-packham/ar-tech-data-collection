<?php
// Include configuration file for database connection
require "./config.php";

// Set maximum length of session
$timeout = 3600;
ini_set("session.gc_maxlifetime", $timeout);

// Set cookie lifetime 
ini_set("session.cookie_lifetime", $timeout);

// Start session
session_start();

// Set headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');

// Fetch data from client
$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $loggedIn = false;
    $decodedData = json_decode($data);
    //print_r($decodedData);
    // Sanitize the entered username to prevent sql injection
    $Username = $conn->real_escape_string($decodedData->Username);
    $User_Password = $conn->real_escape_string($decodedData->User_Password);
    // Create new sql statement
    $sql = "SELECT `credentials`.`Username`, `credentials`.`User_Password`, `employee`.`Emp_ID`, `employee`.`Emp_Status` FROM `credentials`LEFT JOIN `employee` on `credentials`.`employee_ID` = `employee`.`Emp_ID` WHERE BINARY `Username`=? ";
    if ($stmt = mysqli_prepare($conn, $sql)) {
        //Bind variables to prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "s", $param_username);

        // Set parameters
        $param_username = $Username;

        // Attempt to execute the prepared statement
        if (mysqli_stmt_execute($stmt)) {
            // Store result 
            mysqli_stmt_store_result($stmt);
            // Check if username exists, then verify pass if it does
            if (mysqli_stmt_num_rows($stmt) == 1) {
                // Bind results variables
                mysqli_stmt_bind_result($stmt, $Username, $hashed_password, $empID, $status);
                if (mysqli_stmt_fetch($stmt)) {
                    if (password_verify($User_Password, $hashed_password)) {
                        $loggedIn = true;
                        $_SESSION["loggedIn"] = $loggedIn;
                        $newArray = array("Username" => $Username, "User_Password" => $User_Password, "empID" => $empID, "status" => $status);
                        echo json_encode(['User' => $newArray]);
                    }
                }
            }
            mysqli_stmt_close($stmt);
        }
    }
}
?>