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


// Includes environment variables and sanitize function from specified files
include('../../env.php');
include('../../sanitize.php');

// Specify table
$table = 'task';

// Establish a connection to the database
try {
    $db = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    // If connection is successful, set the error mode to exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // If connection fails, stop the script and show an error message
    die("Database connection failed: " . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Sanitize input data

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


        try {
            // Retrieve data from the table
            $query = "SELECT * FROM task WHERE userID = :userID";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':userID', $requestData['userID']);

            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Return the data as JSON response
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
            echo json_encode($data);
        } catch (PDOException $e) {
            header('HTTP/1.1 400 Bad Request');
            header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
            // Return success response
            echo json_encode(array('message' => 'No task data found'));
            die("Retrieval failed: " . $e->getMessage());
        }
    } else {
        // Return error message if required data is not provided
        header('HTTP/1.1 400 Bad Request');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode(array('message' => 'Required data not provided'));
    }
}
