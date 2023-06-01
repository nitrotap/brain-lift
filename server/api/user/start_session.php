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

session_start();

$sessionId = session_id();


header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
echo json_encode(array('message' => 'Session Started', 'sessionId' => $sessionId));
