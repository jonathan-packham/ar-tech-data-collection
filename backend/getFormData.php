<?php
// Include config file
require "./config.php";

// Set headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');

// Create sql statement
$sql = "SELECT DISTINCT `hazard_form`.`Date_Time`, `hazard_form`.`Permit_Number`, `job`.`Job_ID`, `job`.`Job_Name`, `location`.`Location_ID`, `location`.`Location_Name` FROM `hazard_form` LEFT JOIN `job` ON `hazard_form`.`job_ID`=`job`.`Job_ID` LEFT JOIN `location` ON `job`.`Location_ID`=`location`.`Location_ID`";
if ($stmt = mysqli_prepare($conn, $sql)) {
    // Attempt to execute statement
    if (mysqli_stmt_execute($stmt)) {
        // Store result
        mysqli_stmt_store_result($stmt);
        // Bind result variables
        mysqli_stmt_bind_result($stmt, $dateTime, $formNum, $jobID, $jobName, $locationID, $locationName);
        $formData = array();
        while (mysqli_stmt_fetch($stmt)) { 
            $form = array("DateTime" => $dateTime, "FormID" => $formNum, "JobID" => $jobID, "JobName" => $jobName, "LocationID" => $locationID, "LocationName" => $locationName); 
            array_push($formData, $form);  
        }
        echo json_encode(["FormData" => $formData]);
    }
}
