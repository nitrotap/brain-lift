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
}
