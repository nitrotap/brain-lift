<?php

include(__DIR__ . '../../../env.php');
include(__DIR__ . '../../../sanitize.php');


// Specify table
$table = 'answer';

// Establish a connection to the database
try {
    $db = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}



// API endpoint for deleting data from the table
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


        // Your DELETE query
        $query = "DELETE FROM $table WHERE answerID = :value1";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':value1', $requestData['answerID']);

        try {
            $stmt->execute();
        } catch (PDOException $e) {
            die("Delete failed: " . $e->getMessage());
        }

        // Return success response
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode(array('message' => 'Data deleted successfully'));
    } else {
        // Return error message if required data is not provided
        header('HTTP/1.1 400 Bad Request');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode(array('message' => 'Required data not provided'));
    }
}
