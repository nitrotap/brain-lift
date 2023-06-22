<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once('../../../vendor/autoload.php');


function encodeJWT($email, $sessionID)
{
    require('./env.php');


    if (!$email) {
        $email = 'test@email.com';
    }

    if (!$sessionID) {
        $sessionID = 'phpsessionid';
    }


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
        'HS512'
    );

    // Return the data as JSON response
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
    return json_encode($jwt);
}

function decodeJWT($token)
{
    require('./env.php');

    if (verifyJWT($token)) {
        $decoded = JWT::decode($token, new Key($key, 'HS512'));
        return $decoded;
    } else {
        return "Error: JWT was unable to be verified!";
    }
}

function verifyJWT($token)
{
    require('./env.php');

    try {
        $decoded = JWT::decode($token, $secret, array('HS512'));

        // If the token is invalid (for example, the signature didn't match)
        // then decode will throw an exception, and we won't get this far.
        $now = new DateTimeImmutable();

        // Verify that the issuer (iss claim) is correct
        if ($decoded->iss !== $serverName) {
            throw new UnexpectedValueException('Issuer claim invalid');
        }

        // Verify that the token is not being used before it's been issued
        if ($decoded->iat > $now->getTimestamp()) {
            throw new UnexpectedValueException('Issued At claim (iat) in the future');
        }

        // Verify the token is not expired
        if ($decoded->exp < $now->getTimestamp()) {
            throw new UnexpectedValueException('Token has expired');
        }

        // If we got this far, then the token is valid.
        return true;
    } catch (Exception $e) {
        // If the decode throws an exception, then the token was invalid and we should just let the
        // exception bubble up.
        throw $e;
    }
}
