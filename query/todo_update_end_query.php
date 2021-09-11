<?php
    $todoId_val = $_POST['todo_id'];
    $loginId_val = $_POST['login_id'];
    $t_Flg = $_POST['t_Flg'];
    $errMessage="";
    try{
        require('../lib/conectDB.php');
        $statement = $db->prepare('UPDATE momotanidb.todoリスト SET 終了フラグ="1",目標達成フラグ=:t_Flg,終了日時=now() WHERE todoId=:t_id AND ユーザーId=:u_id');
        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
        $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        // Insert実行
        if($statement->execute([
            ':t_id' => $todoId_val
            ,':u_id' => $loginId_val
            ,':t_Flg' => $t_Flg])){
            //DB登録成功
            echo json_encode(array("statusCode"=>200));
        }else{
            echo json_encode(array("statusCode"=>201));
            echo $errMessage='データベースに登録できませんでした。管理者に連絡してください。';
        }
    }catch(PDOException $e){
        echo json_encode(array("statusCode"=>999));
        $errMessage='データベース登録時にエラーが発生しました。管理者に連絡してください。\n' .$e->getMessage();
        echo $errMessage;
        // $db->rollBack();
    }
?>