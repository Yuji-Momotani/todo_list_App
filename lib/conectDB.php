<?php
    $user = 'root';
    $pass = 'root';
    $host = 'localhost';
    $dbname = 'momotaniDB';
    $dsn = "mysql:host={$host};port=8889;dbname={$dbname};";

    try{
        $db = new PDO($dsn,$user,$pass);
    }catch(PDOException $e){
        //仮:後にテスト

    }
    // $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
?>