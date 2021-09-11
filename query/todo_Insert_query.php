<?php
    $login_id = $_POST['id'];
    $todo_value = $_POST['todo'];
    $errMessage="";
    $todoId_val=0;
    try{
        require('../lib/conectDB.php');
        $checkId = $db->prepare("select todoId
                                from momotanidb.todoリスト
                                where ユーザーId = :id
                                and todoId = (select max(todoId) from momotanidb.todoリスト where ユーザーId = :id)");
        $checkId->execute([':id' => $login_id]);
        if($checkId){
            $data = $checkId->fetch();
            $todoId_val = $data['todoId'] + 1;
        }else{
            $todoId_val=1;
        }

        $statement = $db->prepare('INSERT INTO momotanidb.todoリスト
                                    (
                                    todoId
                                    , todo
                                    , ユーザーId
                                    , 終了フラグ
                                    , 目標達成フラグ
                                    , 反省
                                    , 作成日時
                                    , 開始日時
                                    , 終了日時
                                    )
                                    VALUES(
                                    :todoId
                                    ,:todo
                                    ,:id
                                    , 0
                                    , 0
                                    , null
                                    , now()
                                    , null
                                    , null
                                    )');
        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
        $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        // Insert実行
        if($statement->execute([
            ':todoId' => $todoId_val
            ,':id' => $login_id
            ,':todo' => $todo_value])){
            //DB登録成功
            echo json_encode(array("statusCode"=>200,"todoId"=>$todoId_val));
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