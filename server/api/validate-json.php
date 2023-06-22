<?php
require __DIR__ . '/vendor/autoload.php';

use \Firebase\JWT\JWT;

$headers = apache_request_headers();

if (isset($headers['Authorization'])) {
    $jwt = explode(' ', $headers['Authorization'])[1]; // Bearer <token>

    $secret_key = 'YOUR_SECRET_KEY';

    try {
        $decoded = JWT::decode($jwt, $secret_key, array('HS256'));

        // If the JWT is valid, you'll have the token's payload in the $decoded variable

        // Now you can proceed with the request, user is authenticated

    } catch (\Firebase\JWT\ExpiredException $e) {
        // Token has expired
        http_response_code(401);
        echo json_encode(["error" => $e->getMessage()]);
        exit(0);
    } catch (\Firebase\JWT\SignatureInvalidException $e) {
        // Token is invalid
        http_response_code(401);
        echo json_encode(["error" => $e->getMessage()]);
        exit(0);
    } catch (\Exception $e) {
        // Other errors
        http_response_code(400);
        echo json_encode(["error" => $e->getMessage()]);
        exit(0);
    }
} else {
    // No token provided
    http_response_code(401);
    echo json_encode(["message" => "Not authorized"]);
    exit(0);
}
