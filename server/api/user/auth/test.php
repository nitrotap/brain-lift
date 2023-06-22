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

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once('../../../vendor/autoload.php');
// Retrieved from filtered POST data

$email = 'test@email.com';
$sessionID = 'phpsessionid';

$secret  = 'lHfwaotDAiAgx23oL6ruqo2SMKq1wkODkwmT1CgckAG2';
$issuedAt   = new DateTimeImmutable();
$expire     = $issuedAt->modify('+6 minutes')->getTimestamp();      // Add 60 seconds
$serverName = "https://www.brain-lift.org";


$data = [
    'iat'  => $issuedAt->getTimestamp(),         // Issued at: time when the token was generated
    'iss'  => $serverName,                       // Issuer
    'nbf'  => $issuedAt->getTimestamp(),         // Not before
    'exp'  => $expire,                           // Expire
    'email' => $email,                     // email
    'sessionID' => $sessionID
];

$headers = [
    'x-forwarded-for' => 'www.google.com'
];


try {
    // $jwt = "";
    // $jwt = JWT::decode($data, $secret, 'HS256');
    list($payloadB64, $sig) = explode('.', $jwt);
    $decoded = json_decode(base64_decode($payloadB64), true);

    // $decoded = JWT::decode($jwt, new Key($key, 'HS256'));

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); // Allow requests from any origin    
    echo json_encode($decoded);
} catch (Exception $e) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); // Allow requests from any origin    
    echo json_encode($e);
}
// Encode headers in the JWT string

// Decode headers from the JWT string WITHOUT validation
// **IMPORTANT**: This operation is vulnerable to attacks, as the JWT has not yet been verified.
// These headers could be any value sent by an attacker.
// list($headersB64, $payloadB64, $sig) = explode('.', $jwt);
// $decoded = json_decode(base64_decode($headersB64), true);

// print_r($decoded);

// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *'); // Allow requests from any origin

// echo json_encode(array(
//     "jwt" => $jwt,
//     "decoded" => $decoded
// ));
