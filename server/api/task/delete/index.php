<?php
// Check if request method is OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond to preflight request
    header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow these methods
    header('Access-Control-Allow-Headers: Content-Type'); // Allow this header
    header('Content-Type: application/json');
    exit(0); // No further processing if OPTIONS request
}

include(__DIR__ . '../../../env.php');
include(__DIR__ . '../../../sanitize.php');

// Specify table
$table = 'task';

// Establish a connection to the database
try {
    $db = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// API endpoint for deleting a row from the table
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


        // Check if the required parameter is present
        if (empty($requestData['taskID'])) {
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
            echo json_encode(array('error' => 'Missing required parameter: id'));
            exit;
        }

        // Delete the row from the table
        $query = "DELETE FROM $table WHERE taskID = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $requestData['taskID']);
        $stmt->execute();

        // Check if any rows were affected
        $rowCount = $stmt->rowCount();
        header('Content-Type: application/json');
        if ($rowCount > 0) {
            // Return success response
            header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
            echo json_encode(array('message' => 'Row deleted successfully'));
        } else {
            header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
            // Return error response if no rows were affected
            echo json_encode(array('error' => 'No rows found with the specified ID'));
        }
    } else {
        // Return error message if required data is not provided
        header('HTTP/1.1 400 Bad Request');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode(array('message' => 'Required data not provided'));
    }
}
