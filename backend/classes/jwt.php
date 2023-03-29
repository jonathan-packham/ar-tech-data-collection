<?php
/*   
//
//  This script creates a Javascript Web Token, 
//  validates it, and extracts data from it
//
//  generate_jwt: generates JWT and returns it
//  getSigniture: Recieves a token and uses the explode function to mutate it into an array
//                which is then returned
//  getPayload: Recieves a token, mutates the token into an array, using json_decode 
//              the payload is extracted, decoded and then returned
//  base64url_decode: decodes a base64 URL string into a normal string 
//  is_jwt_valid: Recieves jwt and 'Secret', decodes the token into header and payload
//                calls the getSigniture function to validate the tokens signiture
//
//                Build a signature based on the header and payload and generate signiture for it
//                verify the signature matches the signature provided in the jwt
//                return true if valid false if not
//  base64url_encode: encode data as a base64url
//  get_authorization_header: Gets authorization from the server
//  get_bearer_token: gets access token from the header and returns it, else returns null
//
*/
function generate_jwt($headers, $payload, $secret = 'secret') {
    $headers_encoded = base64url_encode(json_encode($headers));
    $payload_encoded = base64url_encode(json_encode($payload));

    $signature = hash_hmac(
        'SHA256',
        "$headers_encoded.$payload_encoded",
        $secret,
        true
    );
    $signature_encoded = base64url_encode($signature);

    $jwt = "$headers_encoded.$payload_encoded.$signature_encoded";

    return $jwt;
}

function getSigniture($token) {
    $_token=explode(".",$token);
    return $_token[2];
}

function getPayload($token) {
    $_token=explode(".",$token);
    $payload=json_decode(base64UrlDecode($_token[1]));

    return $payload;
}

function base64UrlDecode(string $base64Url): string {
    return base64_decode(strtr($base64Url, '-_', '+/'));
}

function is_jwt_valid($jwt, $secret = 'secret') {
    //split the token
    $tokenParts = explode('.', $jwt);
    $header = base64_decode($tokenParts[0]);
    $payload = base64_decode($tokenParts[1]);
    $signature_provided = getSigniture($jwt);

    //build a signature based on the header and payload using the secret
    $base64_url_header = base64url_encode($header);
    $base64_url_payload = base64url_encode($payload);
    $signature = hash_hmac(
        'SHA256',
        $base_url_header . '.' . $base64_url_payload,
        $secret,
        true
    );
    $base64_url_signature = base64url_encode($signature);

    //verify it matches the signature provided in the jwt
    $is_signature_valid = $base64_url_signature === $signature_provided;

    if(!$is_signature_valid) {
        return false;
    } else {
        return true;
    }
}

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function get_authorization_header() {
    $headers = null;

    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER['Authorization']);
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        //Nginx or fast CGI
        $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        //Server-side fix for bug in older Android versions, included to ensure various older devices that employees may use wouldnt be affected
        $requestHeaders = array_combine(
            array_map('ucwords', array_keys($requestHeaders)),
            array_values($requestHeaders)
        );
        //print_r($requestHeaders);
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }

    return $headers;
}

function get_bearer_token() {
    $headers = get_authorization_header();

    //HEADER: Get the access token from the header
    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }

    return null;
}