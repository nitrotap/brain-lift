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

// API endpoint for retrieving data from a table
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve data from the table
    $query = "SELECT * FROM $table";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $sessionId = session_start();


    try {
        $payload = [
            "userID" => $data['userID'],
            "email" => $data['email'],
            "iat" => time(),
            "exp" => time() + (60 * 60), // 1 hour expiration time,
            "access" => true,
            "sessionID" => $sessionId
        ];
        $jwt = JWT::encode($payload, 'Zgl68pwKQFf9N88A', 'HS256');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode($jwt);


    } catch (error $e) {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
        echo json_encode($e);
    }


    // Return the data as JSON response
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
    echo json_encode($data);

}

// API endpoint for inserting data into a table
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    sanitizeRequestStrings();
    $hash = password_hash($_REQUEST["password"], PASSWORD_BCRYPT);

    $_REQUEST["password"] = $hash;

    $requestData = $_REQUEST;

    // Insert the data into the table
    $query = "INSERT INTO $table (email, password) VALUES (:value1, :value2)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':value1', $requestData['email']);
    $stmt->bindParam(':value2', $requestData['password']);

    $stmt->execute();

    // get user email
    $query = "SELECT * FROM $table WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $requestData['email']);
    $stmt->execute();

    $data = $stmt->fetch(PDO::FETCH_ASSOC);


    // Return success response
    session_start();
    $sessionId = session_id();
    $payload = [
        "userID" => $data['userID'],
        "email" => $data['email'],
        "iat" => time(),
        "exp" => time() + (60 * 60), // 1 hour expiration time,
        "access" => true,
        "sessionID" => $sessionId
    ];
    $jwt = JWT::encode($payload, 'Zgl68pwKQFf9N88A', 'HS256');

    // save session id to mysql database in user_table for column session_id
    $updateQuery = "UPDATE $table SET session_id=:session_id WHERE email=:email";
    $updateStmt = $db->prepare($updateQuery);
//  $updateStmt->bindParam(':session_id', $sessionId);
    $updateStmt->bindParam(':session_id', $jwt);

    $updateStmt->bindParam(':email', $requestData['email']);
    $updateStmt->execute();

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
    echo json_encode(array(
        'message' => 'Signup Successful!',
        'sessionID' => $jwt,
        'Authorization' => 'true',
        'data' => json_encode($data)
    ));
}
