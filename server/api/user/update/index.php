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
$table = 'user_table';

// Establish a connection to the database
try {
    $db = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// API endpoint for inserting data into a table
if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    sanitizeRequestStrings();
    $hash = password_hash($_REQUEST["password"], PASSWORD_BCRYPT);

    $_REQUEST["password"] = $hash;


    // Retrieve data from the request body
    $requestData = $_REQUEST;

    // Update the data in the table
    $query = "UPDATE $table SET email = :value1, password = :value2 WHERE userID = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':value1', $requestData['email']);
    $stmt->bindParam(':value2', $requestData['password']);

    $stmt->bindParam(':id', $requestData['userID']);

    $stmt->execute();

    // Return success response
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
    echo json_encode(array('message' => 'Data updated successfully'));
}
