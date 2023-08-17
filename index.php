<?php
require_once('./config/config.php');

if(isset($_GET['url'])){

    $url = $_GET['url'];

    if(is_null($url) || empty($url)){
        header("Location: ./shorten.php");
    }else{
        $verify = mysqli_query($con,"SELECT * FROM url WHERE extension='$url'");
        if(mysqli_num_rows($verify) >0){
            $fetchVerify = mysqli_fetch_array($verify);
            header("Location: ".$fetchVerify['redirect_to']);
        }else{
            header("Location: ./shorten.php");
        }
    }

}else{
    echo"<script>alert('Invalid URL');";
    header("Location: ./shorten.php");
}


?>