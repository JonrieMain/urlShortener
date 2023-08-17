<?php

require_once("../config/config.php");


if(isset($_POST['url'])){
    
    $url = mysqli_real_escape_string($con,$_POST['url']);
    $newName = mysqli_real_escape_string($con,$_POST['newName']);
    $createdUrl = "localhost/urlShortener?url=".$newName;
    
    $trimNewName = trim($newName);

    if(empty($url)||strlen($url)>250||empty($newName)||strlen($newName) > 100){
        echo "Error";
    }else{
       
        // verify if the new name(extension) is not already exist
        $verifyEx = mysqli_query($con,"SELECT * FROM url WHERE extension='$trimNewName'");
    
        

        if(mysqli_num_rows($verifyEx) > 0){
            echo "URL Extension is already exist.";
        } else{
            mysqli_query($con,"INSERT INTO `url`(created_url,redirect_to,extension) VALUES('$createdUrl','$url','$trimNewName') ");
            echo $createdUrl;


        }

    }

}



?>