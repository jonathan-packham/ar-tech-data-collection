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
$sql = "SELECT DISTINCT `f.Date_Time`, `f.Permit_Number`, `f.job_ID`, `j.Job_ID`, `j.Job_Name`, `j.Location_ID`, `l.Location_ID`, `l.Location_Name` FROM `hazard_form` as `f` WHERE `f.Date_Time`>=DATEADD(day, -7, GETDATE()) LEFT JOIN `job` AS `j` ON `f.job_ID`=`j.Job_ID` LEFT JOIN `location` AS `l` ON `j.Location_ID`=`l.Location_ID`";
if ($stmt = mysqli_prepare($conn, $sql)) {
    // Attempt to execute statement
    if (mysqli_stmt_execute($stmt)) {
        $formData = array();
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
