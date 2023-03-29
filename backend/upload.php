<?php
//require configuration file for connection to database
require './config.php';

// Set headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');

// Fetch data from client 
$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $decodedData = json_decode($data, true);

    // Set variables
    $access = $decodedData['AccessExit']; 
    $airborne = $decodedData['Airborne_Particles'];
    $barricade = $decodedData['BarricadeFlag_Area'];
    $blind = $decodedData['BlindedBlankedDisconnected'];
    $chem = $decodedData['Chemical_Protection_Clothing'];
    $code = $decodedData['Code_Of_Practice'];
    $com = $decodedData['Communication_Device'];
    $confine = $decodedData['Confined_Space_Entry'];
    $cotton = $decodedData['Cotton_Coveralls'];
    $date = $conn->real_escape_string($decodedData['Date_Time']);
    $deppres = $decodedData['Depressurized'];
    $diesel = $decodedData['Diesel_Emergency_Shut_Down'];
    $drain = $decodedData['Drainage'];
    $emergency = $decodedData['Emergency_Response_Plan_Review']; 
    $empID = $decodedData['employee_ID'];
    $phone = $conn->real_escape_string($decodedData['Emp_Phone']);
    $extension = $decodedData['Extension_Cords'];
    $fall = $decodedData['Fall_Protection'];
    $fire = $decodedData['Fire_Resistant_Clothing'];
    $floor = $decodedData['FloorRoof_Openings'];
    $general = $decodedData['General_Housekeeping'];
    $gloves = $decodedData['Gloves'];
    $goggles = $decodedData['Goggles'];
    $grounding = $decodedData['Grounding'];
    $h2s = $decodedData['H2S'];
    $hard = $decodedData['Hard_Hat'];
    $hearing = $decodedData['Hearing_Protection'];
    $heavy = $decodedData['Heavy_Lifting'];
    $hivis = $decodedData['High_Visibility_Clothing'];
    $hygiene = $decodedData['Hygiene_Program'];
    $identify = $conn->real_escape_string($decodedData['Identified_Hazards']);
    $safeLight = $decodedData['Intrinsically_Safe_Lighting'];
    $jobID = $decodedData['job_ID'];
    $ladders = $decodedData['Ladders'];
    $lifeline = $decodedData['LifelineLanyardSafety_Harness'];
    $lifting = $decodedData['Lifting_Devices_and_Rigging'];
    $lighting = $decodedData['Lighting'];
    $loadSecure = $decodedData['Load_Secured'];
    $locked = $decodedData['LockedTagged'];
    $manlift = $decodedData['Manlift'];
    $mobile = $decodedData['Mobile_Equipment'];
    $msds = $decodedData['MSDS_Reviewed'];
    $muster = $conn->real_escape_string($decodedData['Muster_Point']);
    $overhead = $decodedData['Overhead_Power_Lines'];
    $parking = $decodedData['ParkingFencing'];
    $personal = $decodedData['Personal_Gas_Monitor'];
    $pinch = $decodedData['Pinch_Points'];
    $power = $decodedData['Power_Tools'];
    $product = $decodedData['Product_Handling_and_Storage']; 
    $public= $decodedData['Public_Safety'];
    $required = $conn->real_escape_string($decodedData['Required_Action_To_Eliminate_Hazards']);
    $resp = $decodedData['Respiratory_Protection'];
    $safeGlass = $decodedData['Safety_Glasses']; 
    $safeWatch = $decodedData['Safety_Watch'];
    $safeWork = $decodedData['Safe_Working_Practices'];
    $scaffolding = $decodedData['Scaffolding'];
    $scaffLad = $decodedData['ScaffoldLadder'];
    $sequence = $conn->real_escape_string($decodedData['Sequence_Of_Basic_Job_Steps']);
    $smokeOrNo = $decodedData['SmokingNo_Smoking_Rules'];
    $spill = $decodedData['Spill_Prevention_and_Response'];
    $steam = $decodedData['SteamWashed'];
    $steel = $decodedData['Steel_Toed_Boots'];
    $tdg = $decodedData['TDG_Placards'];
    $traffic = $decodedData['Traffic'];
    $vapors = $decodedData['VaporsOdours']; 
    $vehicle = $decodedData['Vehicle_Inspections'];
    $vent = $decodedData['Ventilation'];
    $visi = $decodedData['Visibility'];
    $waste = $decodedData['Waste_Management'];
    $weather = $decodedData['Weather_Extremes'];
    $worker = $decodedData['Worker_Training'];
    $alone = $decodedData['Working_Alone'];
    $heights = $decodedData['Working_with_Heights'];
    $entry = $decodedData['Work_Site_Entry'];
    $signature = $conn->real_escape_string($decodedData['SignatureData']);

    // Create sql statement
    $sql = "INSERT INTO hazard_form (AccessExit, Airborne_Particles, BarricadeFlag_Area, BlindedBlankedDisconnected, Chemical_Protection_Clothing, Code_Of_Practice, Communication_Device, Confined_Space_Entry, Cotton_Coveralls, Date_Time, Depressurized, Diesel_Emergency_Shut_Down, Drainage, Emergency_Response_Plan_Review, employee_ID, Emp_Phone, Extension_Cords, Fall_Protection, Fire_Resistant_Clothing, FloorRoof_Openings, General_Housekeeping, Gloves, Goggles, Grounding, H2S, Hard_Hat, Hearing_Protection, Heavy_Lifting, High_Visibility_Clothing, Hygiene_Program, Identified_Hazards, Intrinsically_Safe_Lighting, job_ID, Ladders, LifelineLanyardSafety_Harness, Lifting_Devices_and_Rigging, Lighting, Load_Secured, LockedTagged, Manlift, Mobile_Equipment, MSDS_Reviewed, Muster_Point, Overhead_Power_Lines, ParkingFencing, Personal_Gas_Monitor, Pinch_Points, Power_Tools, Product_Handling_and_Storage, Public_Safety, Required_Action_To_Eliminate_Hazards, Respiratory_Protection, Safety_Glasses, Safety_Watch, Safe_Working_Practices, Scaffolding, ScaffoldLadder, Sequence_Of_Basic_Job_Steps, SmokingNo_Smoking_Rules, Spill_Prevention_and_Response, SteamWashed, Steel_Toed_Boots, TDG_Placards, Traffic, VaporsOdours, Vehicle_Inspections, Ventilation, Visibility, Waste_Management, Weather_Extremes, Worker_Training, Working_Alone, Working_with_Heights, Work_Site_Entry, SignatureData) VALUES ('$access', '$airborne', '$barricade', '$blind', '$chem', '$code', '$com', '$confine', '$cotton', '$date', '$deppres', '$diesel', '$drain', '$emergency', '$empID', '$phone', '$extension', '$fall', '$fire', '$floor', '$general', '$gloves', '$goggles', '$grounding', '$h2s', '$hard', '$hearing', '$heavy', '$hivis', '$hygiene', '$identify', '$safeLight', '$jobID', '$ladders', '$lifeline', '$lifting', '$lighting', '$loadSecure', '$locked', '$manlift', '$mobile', '$msds', '$muster', '$overhead', '$parking', '$personal', '$pinch', '$power', '$product', '$public', '$required', '$resp', '$safeGlass', '$safeWatch', '$safeWork', '$scaffolding', '$scaffLad', '$sequence', '$smokeOrNo', '$spill', '$steam', '$steel', '$tdg', '$traffic', '$vapors', '$vehicle', '$vent', '$visi', '$waste', '$weather', '$worker', '$alone', '$heights', '$entry', '$signature')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode('Success!');
    } else {
        echo json_encode('fail');
    }
}
?>