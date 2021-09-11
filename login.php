<?php
    //画面モードの変数 
    $mode_shoki=1;
    $mode_login=2;
    $mode_OK=3;
    $mode_NG=99;

    if(isset($_POST['mode'])){
        $mode=$_POST['mode'];
    }else{
        // 画面初期起動時
        $mode=$mode_shoki;
    }

    // ログインボタンが押されたとき→ID、パスワードが存在するかチェック
    if($mode==$mode_login){
        require('./query/login_check_query.php');
    }
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/login.css">
    <title>ログイン</title>
</head>
<body>
    <form name="frm" action="" method="post">
        <div class="container">
            <div class="center w_400">
                <div class="txt_center">
                    <div class="w_200 l_Title">ログイン画面</div>
                </div>
                <div class="l_inputarea">
                <?php
                    // ログインに失敗したときのエラーメッセージ
                    if($mode==$mode_NG){
                        echo '<div style="text-align:center; color:red; margin-top:20px;margin-bottom:0;">'.$login_NG_Message.'</div>';
                    };
                ?>
                    ユーザーID：<input type="text" id="userId" name="userId" onkeypress="txt_loginEnter(event.keyCode);"><br/>
                    パスワード：<input type="password" id="password" name="password" onkeypress="txt_loginEnter(event.keyCode);"><br/>
                </div>
                <div class="l_btnArea">
                    <input type="button" id="clear" value="クリア">
                    <input type="button" id="login" value="ログイン"><br/>
                    <div class="m_t10">
                        <a href="./createAcount.php">アカウント作成はこちら</a>
                    </div>
                </div>
            </div>
        </div>
        <input type="hidden" id="mode" name="mode" value="">
        <input type="hidden" id="login_Id" name="login_Id" value="">
    </form>
<script src="./js/common.js"></script>
<script src="./js/login.js"></script>
</body>
<?php
    //ログインに成功したとき → index.phpにsubmit
    if($mode==$mode_OK){
        echo <<<EOM
        <script type="text/javascript">
            document.getElementById('login_Id').value = '$_POST[userId]';
            document.frm.action="./index.php";
            document.frm.submit();
        </script>
        EOM;
    };
?>
</html>
