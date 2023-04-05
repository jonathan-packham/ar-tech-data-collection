<?php 
// Include config file 
require "./config.php";

// Set headers 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');

// Get Username from client
$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $decodedData = json_decode($data, true);

    // Set username
    $username = $decodedData['username'];

    // Create sql statement
    $sql = "SELECT `credentials`.`Username`, `employee`.`Emp_ID`, `employee`.`Emp_Phone`, `employee`.`Emp_FirstName`, `employee`.`Emp_LastName`, `employee`.`Emp_Status`  FROM `credentials` LEFT JOIN `employee` ON `credentials`.`employee_ID`= `employee`.`Emp_ID` WHERE `credentials`.`Username`=? ";
    if ($stmt = mysqli_prepare($conn, $sql)) {
        // Bind variables to prepared statement
        mysqli_stmt_bind_param($stmt, "s", $username);

        // Attempt to execute statement
        if (mysqli_stmt_execute($stmt)) {
            // Store result
            mysqli_stmt_store_result($stmt);
            // Bind results variables
            mysqli_stmt_bind_result($stmt, $Username, $empID, $Phone, $FirstName, $LastName, $Status);
            if (mysqli_stmt_fetch($stmt)) {
                $user = array("Username" => $Username, "empID" => $empID, "Phone" => $Phone, "FirstName" => $FirstName, "LastName" => $LastName, "Status" => $Status);
                if (!empty($user)) {
                    echo json_encode(["User" => $user]);
                } else {
                    echo json_encode(["Error" => "User not found"]);
                }
            } else {
                echo json_encode(["Error" => "User not found"]);
            }
        }
    }
}
?>