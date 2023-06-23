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

require(__DIR__ . '../../../../vendor/autoload.php');

use Firebase\JWT\JWT;

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


    // Retrieve data from the request body
    $requestData = $_REQUEST;


    // get user email
    $query = "SELECT * FROM $table WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $requestData['email']);
    $stmt->execute();


    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        http_response_code(401);
        echo json_encode(['error' => 'No user found for this email.']);
        exit();
    }

    // Verify password
    if (!password_verify($_REQUEST['password'], $user['password'])) {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin

        http_response_code(401);
        echo json_encode(['error' => 'Password is incorrect.']);
        exit();
    }

    session_start();

    // save session id to mysql database in user_table for column session_id
    $sessionId = session_id();

    $payload = [
        "userID" => $user['userID'],
        "email" => $user['email'],
        "iat" => time(),
        "exp" => time() + (60 * 60), // 1 hour expiration time,
        "access" => true,
        "sessionID" => $sessionId
    ];
    $jwt = JWT::encode($payload, 'Zgl68pwKQFf9N88A', 'HS256');


    $updateQuery = "UPDATE $table SET session_id=:session_id WHERE email=:email";
    $updateStmt = $db->prepare($updateQuery);
//  $updateStmt->bindParam(':session_id', $sessionId);
    $updateStmt->bindParam(':session_id', $jwt);

    $updateStmt->bindParam(':email', $requestData['email']);
    $updateStmt->execute();


    // Return success response
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
    header('Authorization: Bearer ' . $jwt);

    echo json_encode(array(
        'message' => 'Login successful!',
        'sessionID' => $jwt,
        'Authorization' => 'true',
    ));
}
