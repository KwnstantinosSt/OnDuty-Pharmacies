<?php
    include('../lib/simple_html_dom.php');
   

    function getFarmachyData($reg){
    
    try{
    
    $date = date("d/m/Y");
    $region = $reg;
    $url = "https://www.xo.gr/efimerevonta-farmakeia/$region/?date=$date";
    $htmlt = curl_get_file_contents($url);
    $html = str_get_html($htmlt);
    //$html = file_get_html(($url));
    //$html = file_get_html("https://www.xo.gr/efimerevonta-farmakeia/agia-varvara-attikis/?date=" . $date);
    $title = $html->find('h1',0);
    if($title === null){return false;}
    $pageTitle = $title->plaintext;
    if($pageTitle === null){return false;}
    $p = $html->find('div[class=span12 NoticeArea PharmacyArea] p',0)->plaintext;
    if($p === null){return false;}
    $mainDiv = $html->find('div[class=row listResults pharmacies-list] ol',0); 
    $pharmachys = $mainDiv->children();
    $phar_num = sizeof($pharmachys);
    $back_arr = array();
    $back_arr['data'] = array();

for($i=0;$i<$phar_num;$i++){
    $title = $html->find('h1',0);
    $pageTitle = $title->plaintext;
    $p = $html->find('div[class=span12 NoticeArea PharmacyArea] p',0)->plaintext;
    $mainDiv = $html->find('div[class=row listResults pharmacies-list] ol',0); 
    $pharmachys = $mainDiv->children();
    $nPharmacy = $pharmachys[$i];
    $nPharmacy = $nPharmacy->find('li',0)->children(0);
    $title = $nPharmacy->children(0)->plaintext;
    $phone = $nPharmacy->find('li',1) ->plaintext;
    $address = $nPharmacy->find('p[class=listingAddressInfo]',0)->plaintext;
    $cAddress = str_replace("(Δρομολόγηση)","",$address);
    $cAddress = trim($cAddress," ");
    $orario = $nPharmacy->find('p[class=listingOpeningHours]',0)->plaintext;
    $orario = trim($orario," ");
    $title = trim($title," ");
    $phone = trim($phone," ");
    
    $back_item = array(
        'title' => $title ,
        'phone' => $phone ,
        'address' => $cAddress,
        'orario' => $orario
    );
    array_push($back_arr['data'],$back_item);
}

    return $back_arr;

    }catch(Exception $e){
        echo $e->getMessage();
        return false;

    }

}

 



function curl_get_file_contents($URL)
    {
        $c = curl_init();
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_URL, $URL);
        $contents = curl_exec($c);
        curl_close($c);

        if ($contents) return $contents;
        else return FALSE;
    }




?>