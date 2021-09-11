<?php
require('./lib/conectDB.php');
try{
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
    $data = $db->prepare("SELECT todoId,todo
                            FROM momotanidb.todoリスト
                            WHERE ユーザーId= :id
                            and 終了フラグ=0");
    $data->execute([':id' => $login_Id]);
}catch(PDOException $e){

}
?>