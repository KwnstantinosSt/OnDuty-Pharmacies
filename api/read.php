<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');    
header('Content-Type: application/json');

include_once('../core/pharmachy.php');

if($_SERVER['REQUEST_METHOD'] === 'GET'){

    if(isset($_GET["region"])){
        $reg = $_GET["region"];
        $result = getFarmachyData($reg);
            if($result === false){
                header("HTTP/1.1 204 Not Found");
                die();
            }else{
            echo json_encode($result);}
    } elseif (isset($_GET["allregions"])){
       $flag = $_GET["allregions"];
       if($flag == "true"){
           $result = getRegionList();
           if($result){
               http_response_code(200);
               echo json_encode($result);
           }
       }
    }else{
        header("HTTP/1.1 404 Not Found");
        die(json_encode(array('message' => 'No parameter found or region does not exist.')));}
    
 

}else{
    header("HTTP/1.1 404 Not Found");
    die(json_encode(array('message' => 'Wrong Request Method.')));}


?>