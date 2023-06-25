<?php
// Pre-flight request
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
$table = 'user_table';

// Establish a connection to the database
try {
    $db = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
// Return success response


// API endpoint for inserting data into a table
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    sanitizeRequestStrings();

    // Retrieve data from the request body
    $requestData = $_REQUEST;



    // get user email and sessionID
    $query = "SELECT * FROM user_table WHERE userID = :userID";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':userID', $requestData['userID']);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);



    if (!$user) {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        http_response_code(401);
        echo json_encode(['error' => 'No user found for this email.']);
        exit();
    }

    // delete session id from database

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

        // save session id to mysql database in user_table for column session_id
        $sessionId = 'REVOKED';
        $updateQuery = "UPDATE $table SET session_id=:session_id WHERE userID = :userID";
        $updateStmt = $db->prepare($updateQuery);
        $updateStmt->bindParam(':session_id', $sessionId);
        $updateStmt->bindParam(':userID', $requestData['userID']);
        $updateStmt->execute();




        echo json_encode(array(
            'message' => 'Logout successful!',
            'sessionID' => $sessionId,
            'Authorization' => 'true',
        ));
    }
}
