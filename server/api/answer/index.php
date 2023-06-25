<?php

include(__DIR__ . '../../env.php');
include(__DIR__ . '../../sanitize.php');

// Specify table
$table = 'answer';

// Establish a connection to the database
try {
    $db = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// API endpoint for retrieving data from a table
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Retrieve data from the table
        $query = "SELECT * FROM $table";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return the data as JSON response
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode($data);
    } catch (PDOException $e) {
        die("Retrieval failed: " . $e->getMessage());
    }
}

// API endpoint for inserting data into a table
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    sanitizeRequestStrings();
    $requestData = $_REQUEST;



    // authenticate user with userID and sessionID.  
    if (isset($requestData['sessionID']) && isset($requestData['userID'])) {
        // get user email and sessionID
        $query = "SELECT * FROM user_table WHERE userID = :userID";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':userID', $requestData['userID']);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!($user['session_id'] === $requestData['sessionID'])) {
            // Set headers to return a JSON response
            header('HTTP/1.1 400 Bad Request');
            header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
            // Return success response
            echo json_encode(array('message' => 'Session ID Mismatch'));
            return;
        }

        if (($user['session_id'] === 'REVOKED' || empty($user['session_id']))) {
            // Set headers to return a JSON response
            header('HTTP/1.1 400 Bad Request');
            header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
            // Return success response
            echo json_encode(array('message' => 'Session ID REVOKED'));
            return;
        }

        // Check if session has timed out
        $lastLoginTime = strtotime($user['lastLogin']);
        $currentTime = time();
        $timeElapsed = $currentTime - $lastLoginTime;
        $timeoutThreshold = 3 * 60 * 60; // 3 hours in seconds
        if ($timeElapsed > $timeoutThreshold) {
            // Set headers to return a JSON response
            header('HTTP/1.1 400 Bad Request');
            header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
            // Return session timeout message
            echo json_encode(array('message' => 'Session Timeout'));
            return;
        }

        // Insert the data into the table
        $query = "INSERT INTO $table (taskAnswer_1, taskAnswer_2, taskAnswer_3, taskAnswer_4, taskAnswer_5, taskAnswer_6, taskScore, dateTaken, userID, taskID) VALUES (:value2, :value3, :value4, :value5, :value6, :value7, :value8, :value9, :value10, :value11)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':value2', $requestData['taskAnswer_1']);
        $stmt->bindParam(':value3', $requestData['taskAnswer_2']);
        $stmt->bindParam(':value4', $requestData['taskAnswer_3']);
        $stmt->bindParam(':value5', $requestData['taskAnswer_4']);
        $stmt->bindParam(':value6', $requestData['taskAnswer_5']);
        $stmt->bindParam(':value7', $requestData['taskAnswer_6']);
        $stmt->bindParam(':value8', $requestData['taskScore']);
        $stmt->bindParam(':value9', $requestData['dateTaken']);
        $stmt->bindParam(':value10', $requestData['userID']);
        $stmt->bindParam(':value11', $requestData['taskID']);


        try {
            $stmt->execute();
        } catch (PDOException $e) {
            die("Insertion failed: " . $e->getMessage());
        }

        // Return success response
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode(array('message' => 'Data inserted successfully'));
    } else {
        // Return error message if required data is not provided
        header('HTTP/1.1 400 Bad Request');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode(array('message' => 'Required data not provided'));
    }
}
