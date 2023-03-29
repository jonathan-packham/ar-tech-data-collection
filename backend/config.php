<?php 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "artech-v2";

    // create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // check connection
    if ($conn->connect_error) {
        die("Connection failed: ".$conn->connect_error);
    }
?>