<?php
/* 
//
// Recieve user requests, validates them using a Java Web Token,
// and extracts the required data from the database and sends them to the user
// in the form of JSON
// 
//  Login: Recieves Username and Password from the user and verifies wether they are correct
//  Reset: Recieves the Username from the user and creates a new password for it and changes the password
//         Needs to be updated to be more secure
//  User: Returns the user profile data
//  return_json: Recieves an array of data and converts it to JSON, and sends to front-end
//
*/
include './classes/db.php';
include './classes/jwt.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

$action = $uri[2];

$bearer_token = get_bearer_token();
$is_jwt_valid = isset($bearer_token) ? $is_jwt_valid($bearer_token) : false;

$database = new Database();

if ($action === 'login') {
    $rest_json = file_get_contents('php://input');
    $_GET = json_decode($rest_json, true);

    $user = [
        'Username' => $_GET['Username'],
        'User_Password' => $_GET['User_Password'],
    ];

    if (
        $user = $database->loginUser(
            $_GET['Username'],
            md5($_GET['User_Password'])
        )
    ) {
        $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = ['user' => $user];
        $jwt = generate_jwt($headers, $payload);
        return_json(['status' => $jwt]);
    }
} elseif ($action === 'user') {
    if ($is_jwt_valid) {
        $username = getPayload($bearer_token)->user->username;
        if ($user = $database->getUser($username)) {
            return_json(['status' => $user]);
        }
    }
} elseif ($action === 'reset') {
    $rest_json = file_get_contents('php://input');
    $_GET = json_decode($rest_json, true);

    if ($user = $database->getUserByUsername($_GET['Username'])) {
        $newPassword = $_GET['User_Password'];
        $user['User_Password'] = md5($newPassword);
        if ($database->updatePassword($user)) {
            return_json(['status' => 1]);
        }
    }
} elseif ($action === 'upload') {
    $rest_json = file_get_contents('php://input');
    $_GET = json_decode($rest_json, true);

    $access = $_GET['Access/']; 
    $airborne = $_GET['Airborne_Particles'];
    $barricade = $_GET['BarricadeFlag_Area'];
    $blind = $_GET['BlindedBlankedDisconnected'];
    $chem = $_GET['Chemical_Protection_Clothing'];
    $code = $_GET['Code_Of_Practice'];
    $com = $_GET['Communication_Device'];
    $confine = $_GET['Confined_Space_Entry'];
    $cotton = $_GET['Cotton_Coveralls'];
    $date = $_GET['Date_Time'];
    $deppres = $_GET['Depressurized'];
    $diesel = $_GET['Diesel_Emergency_Shut_Down'];
    $drain = $_GET['Drainage'];
    $emergency = $_GET['Emergency_Response_Plan_Review']; 
    $empID = $_GET['employee_ID'];
    $empPhone = $_GET['Emp_Phone'];
    $extension = $_GET['Extension_Cords'];
    $fall = $_GET['Fall_Protection'];
    $fire = $_GET['Fire_Resistant_Clothing'];
    $floor = $_GET['FloorRoof_Openings'];
    $general = $_GET['General_Housekeeping'];
    $gloves = $_GET['Gloves'];
    $goggles = $_GET['Goggles'];
    $grounding = $_GET['Grounding'];
    $h2s = $_GET['H2S'];
    $hard = $_GET['Hard_Hat'];
    $hearing = $_GET['Hearing_Protection'];
    $heavy = $_GET['Heavy_Lifting'];
    $hivis = $_GET['High_Visibility_Clothing'];
    $hygiene = $_GET['Hygiene_Program'];
    $identify = $_GET['Identified_Hazards'];
    $safeLight = $_GET['Intrinsically_Safe_Lighting'];
    $jobID = $_GET['job_ID'];
    $ladders = $_GET['Ladders'];
    $lifeline = $_GET['LifelineLanyardSafety_Harness'];
    $lifting = $_GET['Lifting_Devices_and_Rigging'];
    $lighting = $_GET['Lighting'];
    $loadSecure = $_GET['Load_Secured'];
    $locked = $_GET['LockedTagged'];
    $manlift = $_GET['Manlift'];
    $mobile = $_GET['Mobile_Equipment'];
    $msds = $_GET['MSDS_Reviewed'];
    $muster = $_GET['Muster_Point'];
    $overhead = $_GET['Overhead_Power_Lines'];
    $parking = $_GET['ParkingFencing'];
    $personal = $_GET['Personal_Gas_Monitor'];
    $pinch = $_GET['Pinch_Points'];
    $power = $_GET['Power_Tools'];
    $product = $_GET['Product_Handling_and_Storage']; 
    $public= $_GET['Public_Safety'];
    $required = $_GET['Required_Action_To_Eliminate_Hazards'];
    $resp = $_GET['Respiratory_Protection'];
    $safeGlass = $_GET['Safety_Glasses']; 
    $safeWatch = $_GET['Safety_Watch'];
    $safeWork = $_GET['Safe_Working_Practices'];
    $scaffolding = $_GET['Scaffolding'];
    $scaffLad = $_GET['ScaffoldLadder'];
    $sequence = $_GET['Sequence_Of_Basic_Job_Steps'];
    $smokeOrNo = $_GET['SmokingNo_Smoking_Rules'];
    $spill = $_GET['Spill_Prevention_and_Response'];
    $steam = $_GET['SteamWashed'];
    $steel = $_GET['Steel_Toed_Boots'];
    $tdg = $_GET['TDG_Placards'];
    $traffic = $_GET['Traffic'];
    $vapors = $_GET['VaporsOdours']; 
    $vehicle = $_GET['Vehicle_Inspections'];
    $vent = $_GET['Ventilation'];
    $visi = $_GET['Visibility'];
    $waste = $_GET['Waste_Management'];
    $weather = $_GET['Weather_Extremes'];
    $worker = $_GET['Worker_Training'];
    $alone = $_GET['Working_Alone'];
    $heights = $_GET['Working_with_Heights'];
    $entry = $_GET['Work_Site_Entry'];

    if ($database->uploadFormData($access, $airborne, $barricade, $blind, $chem, $code, $com, $confine, $cotton, $date, $deppres, $diesel, $drain, $emergency, $empID, $empPhone, $extension, $fall, $fire, $floor, $general, $gloves, $goggles, $grounding, $h2s, $hard, $hearing, $heavy, $hivis, $hygiene, $identify, $safeLight, $jobID, $ladders, $lifeline, $lifting, $lighting, $loadSecure, $locked, $manlift, $mobile, $msds, $muster, $overhead, $parking, $personal, $pinch, $power, $product, $public, $required, $resp, $safeGlass, $safeWatch, $safeWork, $scaffolding, $scaffLad, $sequence, $smokeOrNo, $spill, $steam, $steel, $tdg, $traffic, $vapors, $vehicle, $vent, $visi, $waste, $weather, $worker, $alone, $heights, $entry)) {
        return json_encode($_GET);
    }
    return json_encode($_GET);
}

return_json(['status' => 0]);

function return_json($arr) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($arr);
    exit();
}
?>