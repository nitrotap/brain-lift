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

// Encode the array to a JWT string.
$jwt = JWT::encode(
    $data,
    $secret,
    'HS256'
);

// Return the data as JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
echo json_encode($jwt);



// // Check if request method is OPTIONS
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     // Respond to preflight request
//     header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
//     header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow these methods
//     header('Access-Control-Allow-Headers: Content-Type'); // Allow this header
//     header('Content-Type: application/json');
//     exit(0); // No further processing if OPTIONS request
// }

// use Firebase\JWT\JWT;

// require_once('../../../vendor/autoload.php');
// // Retrieved from filtered POST data

// $email = 'test@email.com';
// $sessionID = 'phpsessionid';

// $secret  = 'lHfwaotDAiAgx23oL6ruqo2SMKq1wkODkwmT1CgckAG2';

// $data = [
//     'iat'  => $issuedAt->getTimestamp(),         // Issued at: time when the token was generated
//     'iss'  => $serverName,                       // Issuer
//     'nbf'  => $issuedAt->getTimestamp(),         // Not before
//     'exp'  => $expire,                           // Expire
//     'email' => $email,                     // email
//     'sessionID' => $sessionID
// ];

// // Encode the array to a JWT string.
// $jwt = JWT::encode(
//     $data,
//     $secret,
//     'HS256'
// );

// // Return the data as JSON response
// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
// echo json_encode($jwt);






// $key = 'example_key';
// $payload = [
//     'iss' => 'localhost',
//     'aud' => 'http://example.com',
//     'iat' => 1356999524,
//     'nbf' => 1357000000
// ];

// $headers = [
//     'Content-Type' => 'application/json',
//     'Access-Control-Allow-Origin' => '*'
// ];

// // Encode headers in the JWT string
// $jwt = JWT::encode($payload, $key, 'HS256', null, $headers);

// // Decode headers from the JWT string WITHOUT validation
// // **IMPORTANT**: This operation is vulnerable to attacks, as the JWT has not yet been verified.
// // These headers could be any value sent by an attacker.
// list($headersB64, $payloadB64, $sig) = explode('.', $jwt);
// $decoded = json_decode(base64_decode($headersB64), true);

// print_r($decoded);

// $data;
// $data["jwt"] = $jwt;
// $data["decoded"] = $decoded;
