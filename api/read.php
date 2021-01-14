<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');    
header('Content-Type: application/json');

include_once('../core/pharmachy.php');

if($_SERVER['REQUEST_METHOD'] === 'GET'){

    $result = getFarmachyData();
    echo json_encode($result);

}else{
    header("HTTP/1.1 404 Not Found");
    die(json_encode(array('message' => 'Wrong Request Method.')));}


?>