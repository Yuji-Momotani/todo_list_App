<?php
require('./lib/conectDB.php');
$login = $db->prepare('SELECT * FROM ユーザー WHERE ユーザーId = ? AND パスワード = ?');
$login->execute(array(
    $_POST['userId'],
    $_POST['password']
));
$member = $login->fetch();
if($member){
    $mode=$mode_OK;
}else{
    $mode=$mode_NG;
    $login_NG_Message='ログインIdとパスワードが存在しません。';
}
?>