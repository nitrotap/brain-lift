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

// use Firebase\JWT\JWT;
// use Firebase\JWT\Key;

// require_once('../../../vendor/autoload.php');

// // require('./env.php');

// $token = $_REQUEST["token"];

// try {
//     $decoded = JWT::decode($token, new Key($key, 'HS256'));
//     header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
// echo json_encode($decoded);

// } catch (error) {
//     $error->json_encode($e);
//     header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
// echo json_encode($error);

// }

// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
// echo json_encode($decoded);


// if (verifyJWT($token)) {
//     $decoded = JWT::decode($token, new Key($key, 'HS256'));
//     // Return the data as JSON response
//     header('Content-Type: application/json');
//     header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
//     echo json_encode($decoded);
// } else {
//     return "Error: JWT was unable to be verified!";
// }


// function verifyJWT($token)
// {
//     // require('./env.php');

//     $secret  = 'lHfwaotDAiAgx23oL6ruqo2SMKq1wkODkwmT1CgckAG2';
//     $issuedAt   = new DateTimeImmutable();
//     $expire     = $issuedAt->modify('+6 minutes')->getTimestamp();      // Add 60 seconds
//     $serverName = "https://www.brain-lift.org";


//     try {
//         $decoded = JWT::decode($token, $secret, array('HS256'));

//         header('Content-Type: application/json');
//         header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
//         echo json_encode($decoded);

//         // If the token is invalid (for example, the signature didn't match)
//         // then decode will throw an exception, and we won't get this far.
//         $now = new DateTimeImmutable();

//         // Verify that the issuer (iss claim) is correct
//         if ($decoded->iss !== $serverName) {

//             throw new UnexpectedValueException('Issuer claim invalid');
//         }

//         // Verify that the token is not being used before it's been issued
//         if ($decoded->iat > $now->getTimestamp()) {
//             throw new UnexpectedValueException('Issued At claim (iat) in the future');
//         }

//         // Verify the token is not expired
//         if ($decoded->exp < $now->getTimestamp()) {
//             throw new UnexpectedValueException('Token has expired');
//         }

//         // If we got this far, then the token is valid.
//         return true;
//     } catch (Exception $e) {
//         // If the decode throws an exception, then the token was invalid and we should just let the
//         // exception bubble up.
//         throw $e;
//     }
// }

require_once('../../../vendor/autoload.php');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;



header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit(0);
}

$token = $_REQUEST["token"];
$secret = 'lHfwaotDAiAgx23oL6ruqo2SMKq1wkODkwmT1CgckAG2';
$serverName = "https://www.brain-lift.org";

// try {
JWT::$leeway = 60; // $leeway in seconds

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
echo json_encode($token);


// $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
$decoded = JWT::decode($jwt, $secret, ['HS256']);

// list($headersB64, $payloadB64, $sig) = explode('.', $jwt);
// $decoded = json_decode(base64_decode($headersB64), true);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
echo json_encode($serverName);

// Verifications
$now = new DateTimeImmutable();

if ($decoded->iss !== $serverName) {
    throw new UnexpectedValueException('Issuer claim invalid');
}

if ($decoded->iat > $now->getTimestamp()) {
    throw new UnexpectedValueException('Issued At claim (iat) in the future');
}

if ($decoded->exp < $now->getTimestamp()) {
    throw new UnexpectedValueException('Token has expired');
}

echo json_encode($decoded);
// } catch (Exception $e) {
//     http_response_code(500);
//     echo json_encode(['error' => $e->getMessage()]);
//     exit(0);
// }
