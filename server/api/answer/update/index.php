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


// API endpoint for updating data in the table
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




        // Your UPDATE query
        $query = "UPDATE $table SET taskAnswer_1 = :value2, taskAnswer_2 = :value3, taskAnswer_3 = :value4, taskAnswer_4 = :value5, taskAnswer_5 = :value6, taskAnswer_6 = :value7, taskScore = :value8, dateTaken = :value9, userID = :value10, taskID = :value11 WHERE answerID = :value1";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':value1', $requestData['answerID']);
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
            die("Update failed: " . $e->getMessage());
        }

        // Return success response
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode(array('message' => 'Data updated successfully'));
    } else {
        // Return error message if required data is not provided
        header('HTTP/1.1 400 Bad Request');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode(array('message' => 'Required data not provided'));
    }
}
