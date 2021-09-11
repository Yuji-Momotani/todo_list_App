<?php
require('./lib/conectDB.php');
try{
    $sql1;
    $sql2;
    if($beforeMonth==0){
        $sql1="SELECT todoId, todo, ユーザーId, 終了フラグ, 目標達成フラグ, 反省, 作成日時, 開始日時, 終了日時
                FROM momotanidb.todoリスト
                WHERE ユーザーId = ?
                ORDER BY todoId desc
                LIMIT ?, 10";
        $sql2="SELECT todoId
        FROM momotanidb.todoリスト
        WHERE ユーザーId = ?";
    }else{
        $sql1="SELECT todoId, todo, ユーザーId, 終了フラグ, 目標達成フラグ, 反省, 作成日時, 開始日時, 終了日時
                FROM momotanidb.todoリスト
                WHERE ユーザーId = ?
                AND 作成日時 >= (now()-interval $beforeMonth MONTH)
                ORDER BY todoId desc
                LIMIT ?, 10";
        $sql2="SELECT todoId
        FROM momotanidb.todoリスト
        WHERE ユーザーId = ?
        AND 作成日時 >= (now()-interval $beforeMonth MONTH)";
    }
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
    $data = $db->prepare($sql1);
    // $data->execute([':id' => $login_Id]);
    $data->bindParam(1,$login_Id,PDO::PARAM_STR);
    $data->bindParam(2,$limit_start,PDO::PARAM_INT);
    // $data->bindParam(3,$beforeMonth,PDO::PARAM_INT);
    $data->execute();
    $result = $data->fetchAll();
    
    // $db2 = new PDO($dsn,$user,$pass);
    // $db2->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
    $dataCnt = $db->prepare($sql2);
    // $dataCnt->execute([':id' => $login_Id]);
    $dataCnt->bindParam(1,$login_Id,PDO::PARAM_STR);
    // $data->bindParam(2,$beforeMonth,PDO::PARAM_INT);
    $dataCnt->execute();
    $result2 = $dataCnt->fetchAll();
    $rowNum = $dataCnt->rowCount();
    // var_dump($result);
    // var_dump($data);
}catch(PDOException $e){

}
?>