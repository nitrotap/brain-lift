<?php

include(__DIR__ . '../../env.php');
include(__DIR__ . '../../sanitize.php');

// Establish a connection to the database
try {
    $db = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}


// API endpoint for adding a user
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    sanitizeRequestStrings();
    $hash = password_hash($_REQUEST["password"], PASSWORD_BCRYPT);

    $_REQUEST["password"] = $hash;

    $requestData = $_REQUEST;

    // Insert the data into the table
    $query = "INSERT INTO user_table (email, password) VALUES (:value1, :value2)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':value1', $requestData['email']);
    $stmt->bindParam(':value2', $requestData['password']);

    $stmt->execute();

    // Return success response
    session_start();
    // save session id to mysql database in user_table for column session_id
    $sessionId = session_id();
    $updateQuery = "UPDATE user_table SET session_id=:session_id, lastLogin=:lastLogin WHERE email=:email";
    $updateStmt = $db->prepare($updateQuery);
    $updateStmt->bindParam(':session_id', $sessionId);
    $date = date('Y-m-d H:i:s');
    $updateStmt->bindParam(':lastLogin', $date);
    $updateStmt->bindParam(':email', $requestData['email']);
    $updateStmt->execute();

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
    echo json_encode(array(
        'message' => 'Data inserted successfully',
        'sessionID' => session_id(),
    ));
}
