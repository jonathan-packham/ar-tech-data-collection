<?php 
/*
// 
// This script is responsible for communicating with the database
//
// loginUser: Sends an SQL querry to the database for the employee ID, username and password where the
//			entered credentials are the same
// getUser: function for getting user data using the username
// updateUser: function for updating user records in the database
//
*/
class Database {
	private $server_name = 'localhost';
	private $database_username = 'root';
	private $database_password = '';
	private $database_name = 'artech-v2';
	private $connection = null;

	public function activeUser($empID) {
		$this->connection = new mysqli(
			$this->server_name,
			$this->database_username,
			$this->database_password,
			$this->database_name
		);
		$this->connection->set_charset('utf8');
		$sql = $this->connection->prepare(
			'UPDATE `employee` SET `Status` = "Active" WHERE `employee_ID`=?'
		);
		$sql->bind_param('i', $empID);
		if ($sql->execute()) {
			$sql->close();
			$this->connection->close();
			return true;
		}
		$sql->close();
		$this->connection->close();
		return false;
	}

	public function loginUser($username, $password) {
		$this->connection = new mysqli(
			$this->server_name,
			$this->database_username,
			$this->database_password,
			$this->database_name
		);
		$this->connection->set_charset('utf8');
		$sql = $this->connection->prepare(
			//Add sql to select user data from employee table for the account screen :)
			"SELECT `c.employee_ID`, `c.Username`, `c.User_Password`, `e.Employee_ID`, `e.status` FROM `credentials` AS `c` WHERE BINARY `Username`=? LEFT JOIN `employee` AS `e` on`c.employee_ID` = `e.Employee_ID`"
		);
		$sql->bind_param('s', $username);
		$sql->execute();
		$result = $sql->get_result();
		if ($result->num_rows > 0) {
			$user = $result->fetch_assoc();
			$sql->close();
			$this->connection->close();
			return $user;
		}
		$sql->close();
		$this->connection->close();
		return false;
	}

	public function getUserByUsername($username) {
		$this->connection = new mysqli(
			$this->server_name,
			$this->database_username,
			$this->database_password,
			$this->database_name
		);
		$this->connection->set_charset('utf8');
		$sql = $this->connection->prepare(
			"SELECT DISTINCT * FROM `credentials` WHERE BINARY `Username`=?"
		);
		$sql->bind_param('s', $username);
		$sql->execute();
		$result = $sql->get_result();
		if ($result->num_rows > 0) {
			$user = $result->fetch_assoc();
			$sql->close();
			$this->connection->close();
			return $user;
		}
		$sql->close();
		$this->connection->close();
		return false;
	}

	public function getUser($username) {
		$this->connection = new mysqli(
			$this->server_name,
			$this->database_username,
			$this->database_password,
			$this->database_name
		);
		$this->connection->set_charset('utf8');
		$sql = $this->connection->prepare(
			"SELECT DISTINCT `c.employee_ID`, `c.Username`, `e.Employee_ID`, `e.Emp_Phone`, `e.FirstName`, `e.LastName`, `e.status`  FROM `credentials` AS `c` WHERE BINARY `Username`=? LEFT JOIN `employee` AS `e` ON `c.employee_ID`= `e.Employee_ID`"
		);
		$sql->bind_param('ss', $username, $username);
		$sql->execute();
		$result = $sql->get_result();
		if ($result->num_rows > 0) {
			$user = $result->fetch_assoc();
			$sql->close();
			$this->connection->close();
			return $user;
		}
	}

	public function updatePassword($newPassword,$username) {
		$this->connection = new mysqli(
			$this->server_name,
			$this->database_username,
			$this->database_password,
			$this->database_name,
		);
		$this->connection->set_charset('utf8');
		$sql = $this->connection->prepare(
			"UPDATE `credentials` SET `User_Password` = ? WHERE BINARY `Username` = ?"
		);
		$sql->bind_param('ss', $newPassword, $username);
		if ($sql->execute()) {
			$sql->close();
			$this->connection->close();
			return true;
		}
		$sql->close();
		$this->connection->close();
		return false;
	}

	public function uploadFormData($access, $airborne, $barricade, $blind, $chem, $code, $com, $confine, $cotton, $date, $deppres, $diesel, $drain, $emergency, $empID, $empPhone, $extension, $fall, $fire, $floor, $general, $gloves, $goggles, $grounding, $h2s, $hard, $hearing, $heavy, $hivis, $hygiene, $identify, $safeLight, $jobID, $ladders, $lifeline, $lifting, $lighting, $loadSecure, $locked, $manlift, $mobile, $msds, $muster, $overhead, $parking, $personal, $pinch, $power, $product, $public, $required, $resp, $safeGlass, $safeWatch, $safeWork, $scaffolding, $scaffLad, $sequence, $smokeOrNo, $spill, $steam, $steel, $tdg, $traffic, $vapors, $vehicle, $vent, $visi, $waste, $weather, $worker, $alone, $heights, $entry) {
		$this->connection = new mysqli(
			$this->server_name,
			$this->database_username,
			$this->database_password,
			$this->database_name,
		);
		$this->connection->set_charset('utf8');
		$sql = $this->connection->prepare(
			"INSERT INTO `hazard_form` (AccessExit, Airborne_Particles, BarricadeFlag_Area, BlindedBlankedDisconnected, Chemical_Protection_Clothing, Code_Of_Practice, Communication_Device, Confined_Space_Entry, Cotton_Coveralls, Date_Time, Depressurized, Diesel_Emergency_Shut_Down, Drainage, Emergency_Response_Plan_Review, employee_ID, Emp_Phone, Extension_Cords, Fall_Protection, Fire_Resistant_Clothing, FloorRoof_Openings, General_Housekeeping, Gloves, Goggles, Grounding, H2S, Hard_Hat, Hearing_Protection, Heavy_Lifting, High_Visibility_Clothing, Hygiene_Program, Identified_Hazards, Intrinsically_Safe_Lighting, job_ID, Ladders, LifelineLanyardSafety_Harness, Lifting_Devices_and_Rigging, Lighting, Load_Secured, LockedTagged, Manlift, Mobile_Equipment, MSDS_Reviewed, Muster_Point, Overhead_Power_Lines, ParkingFencing, Personal_Gas_Monitor, Pinch_Points, Power_Tools, Product_Handling_and_Storage, Public_Safety, Required_Action_To_Eliminate_Hazards, Respiratory_Protection, Safety_Glasses, Safety_Watch, Safe_Working_Practices, Scaffolding, ScaffoldLadder, Sequence_Of_Basic_Job_Steps, SmokingNo_Smoking_Rules, Spill_Prevention_and_Response, SteamWashed, Steel_Toed_Boots, TDG_Placards, Traffic, VaporsOdours, Vehicle_Inspections, Ventilation, Visibility, Waste_Management, Weather_Extremes, Worker_Training, Working_Alone, Working_with_Heights, Work_Site_Entry) VALUES ('$access', '$airborne', '$barricade', '$blind', '$chem', '$code', '$com', '$confine', '$cotton', '$date', '$deppres', '$diesel', '$drain', '$emergency', '$empID', '$empPhone', '$extension', '$fall', '$fire', '$floor', '$general', '$gloves', '$goggles', '$grounding', '$h2s', '$hard', '$hearing', '$heavy', '$hivis', '$hygiene', '$identify', '$safeLight', '$jobID', '$ladders', '$lifeline', '$lifting', '$lighting', '$loadSecure', '$manlift', '$mobile', '$msds', '$muster', '$overhead', '$parking', '$personal', '$pinch', '$power', '$product', '$public', '$required', '$resp', '$safeGlass', '$safeWatch', '$safeWork', '$scaffolding', '$scaffLad', '$sequence', '$smokeOrNo', '$spill', '$steam', '$steel', '$tdg', '$traffic', '$vapors', '$vehicle', '$vent', '$visi', '$waste', '$weather', '$worker', '$alone', '$heights', '$entry'"
		);
		$sql->bind_param('iiiiiiiiisiiiiisiiiiiiiiiiiiiisiiiiiiiiiiiiiiiiiiiisiiiiiisiiiiiiiiiiiiiiii', $access, $airborne, $barricade, $blind, $chem, $code, $com, $confine, $cotton, $date, $deppres, $diesel, $drain, $emergency, $empID, $empPhone, $extension, $fall, $fire, $floor, $general, $gloves, $goggles, $grounding, $h2s, $hard, $hearing, $heavy, $hivis, $hygiene, $identify, $safeLight, $jobID, $ladders, $lifeline, $lifting, $lighting, $loadSecure, $locked, $manlift, $mobile, $msds, $muster, $overhead, $parking, $personal, $pinch, $power, $product, $public, $required, $resp, $safeGlass, $safeWatch, $safeWork, $scaffolding, $scaffLad, $sequence, $smokeOrNo, $spill, $steam, $steel, $tdg, $traffic, $vapors, $vehicle, $vent, $visi, $waste, $weather, $worker, $alone, $heights, $entry);
		if ($sql->execute()) {
			$sql->close();
			$this->connection->close();
			return true;
		}
		$sql->close();
		$this->connection->close();
		return false;
	}
}