<?php

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

// API endpoint for inserting data into a table
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    sanitizeRequestStrings();

    // Retrieve data from the request body
    $requestData = $_REQUEST;


    // Update the data in the table
    $query = "UPDATE $table SET taskName = :value1, taskType = :value2, taskTime = :value3, userID = :value4 WHERE taskID = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':value1', $requestData['taskName']);
    $stmt->bindParam(':value2', $requestData['taskType']);
    $stmt->bindParam(':value3', $requestData['taskTime']);
    $stmt->bindParam(':value4', $requestData['userID']);
    $stmt->bindParam(':id', $requestData['taskID']);

    $stmt->execute();

    // Return success response
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
    echo json_encode(array('data' => $stmt));

    echo json_encode(array('message' => 'Data updated successfully'));
}
