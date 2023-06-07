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
include(__DIR__ . '../../env.php');
include(__DIR__ . '../../sanitize.php');

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
// Check if request method is POST

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Sanitize input data

    sanitizeRequestStrings();
    $requestData = $_REQUEST;
    // Check if required data is provided
    if (isset($requestData['taskName']) && isset($requestData['taskType']) && isset($requestData['userID'])) {

        // Insert the data into the table
        // Prepare and bind parameters for an insert query

        $query = "INSERT INTO $table (taskName, taskType, userID) VALUES (:value1, :value2, :value3)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':value1', $requestData['taskName']);
        $stmt->bindParam(':value2', $requestData['taskType']);
        $stmt->bindParam(':value3', $requestData['userID']);

        $stmt->execute();

        // Set headers to return a JSON response
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        // Return success response
        echo json_encode(array('message' => 'Data inserted successfully'));
    } else {
        // Return error message if required data is not provided
        header('HTTP/1.1 400 Bad Request');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode(array('message' => 'Required data not provided'));
    }
}
