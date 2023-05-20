<?php

include(__DIR__ . '../../../env.php');

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
    $requestData = $_REQUEST;

    // Check if the required parameter is present
    if (empty($requestData['taskID'])) {
        header('Content-Type: application/json');
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
    if ($rowCount > 0) {
        // Return success response
        header('Content-Type: application/json');
        echo json_encode(array('message' => 'Row deleted successfully'));
    } else {
        // Return error response if no rows were affected
        header('Content-Type: application/json');
        echo json_encode(array('error' => 'No rows found with the specified ID'));
    }
}
