<?php
// Include config file
require "./config.php";

// Set headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');

// Create sql statement
$sql = "SELECT `Job_ID`, `Job_Name` FROM `job` WHERE `Job_Status`='Active'";
if ($stmt = mysqli_prepare($conn, $sql)) {
    // Attempt to execute statement
    if (mysqli_stmt_execute($stmt)) {
        // Store result 
        mysqli_stmt_store_result($stmt);
        // Bind results variables
        mysqli_stmt_bind_result($stmt, $jobID, $jobName);
        while (mysqli_stmt_fetch($stmt)) {
            $jobs[] = array("JobID" => $jobID, "JobName" => $jobName);
        }
        echo json_encode(["Jobs" => $jobs]);
    }
}
?>