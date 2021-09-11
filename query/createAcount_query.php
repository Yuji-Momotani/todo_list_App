<?php
$errMessage="";
try{
    require('./lib/conectDB.php');
    $check_create = $db->prepare('SELECT * FROM ユーザー WHERE ユーザーId = ?');
    $check_create->execute(array(
        $userId
    ));
    $check_id = $check_create->fetch();
    if($check_id){
        // 既に存在するIDを記入された場合
        $mode=$mode_checkNg;
        $errMessage='既に存在するIDです。IDを変更して登録してください。';
        $errNaiyo='IDが既に存在します。';
    }else{
        // 存在しないIDが記入された場合→INSERT
        $statement = $db->prepare('INSERT INTO momotanidb.ユーザー
                                    SET 
                                        ユーザーId = :id
                                        ,パスワード = :pass
                                        ,名前漢字 = :nameKanji
                                        ,名前かな = :nameKana
                                        ,最終ログイン=null
                                        ,作成日時=now()
                                ');
        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
        $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $db->beginTransaction();
        // Insert実行
        $statement->execute([
            ':id' => $userId,
            ':pass' => $password,
            ':nameKanji' => $nameKanji,
            ':nameKana' => $nameKana,
        ]);
        $db->commit();
    }

}catch(PDOException $e){
    // $errMessage='DB登録エラー: ' .$e->getMessage();
    $errMessage='DB登録エラーが発生しました。システム管理者に連絡してください。';
    $errNaiyo = $e->getMessage();
    $mode=$errFlag;
    $db->rollBack();
}
?>