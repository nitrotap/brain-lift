<?php

function sanitizeRequestStrings()
{
    foreach ($_REQUEST as $key => $value) {
        if (is_array($value)) {
            $_REQUEST[$key] = sanitizeRequestStringsRecursive($value);
        } else {
            $_REQUEST[$key] = sanitizeString($value);
        }
    }
}

function sanitizeRequestStringsRecursive($array)
{
    foreach ($array as $key => $value) {
        if (is_array($value)) {
            $array[$key] = sanitizeRequestStringsRecursive($value);
        } else {
            $array[$key] = sanitizeString($value);
        }
    }
    return $array;
}

function sanitizeString($string)
{
    $string = trim($string); // Remove leading/trailing whitespace
    $string = stripslashes($string); // Remove backslashes
    $string = htmlspecialchars($string, ENT_QUOTES, 'UTF-8'); // Convert special characters to HTML entities
    return $string;
}

// Usage:
sanitizeRequestStrings();
