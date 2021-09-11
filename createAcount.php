<?php
$mode_shoki=1;
$mode_create=2;
$mode_checkNg=9;
$errFlag=99;

// モードの変数定義
if(isset($_POST['mode'])){
    $mode=$_POST['mode'];
}else{
    // 画面初期起動時
    $mode=$mode_shoki;
}
// ユーザーIdの変数定義(登録用)
if(isset($_POST['userId'])){
    $userId=$_POST['userId'];
}else{
    // 画面初期起動時
    $userId="";
}
// パスワードの変数定義(登録用)
if(isset($_POST['password'])){
    $password=$_POST['password'];
}else{
    // 画面初期起動時
    $password="";
}
// 名前(漢字)の変数定義(登録用)
if(isset($_POST['nameKanji'])){
    $nameKanji=$_POST['nameKanji'];
}else{
    // 画面初期起動時
    $nameKanji="";
}
// 名前(かな)の変数定義(登録用)
if(isset($_POST['nameKana'])){
    $nameKana=$_POST['nameKana'];
}else{
    // 画面初期起動時
    $nameKana="";
}
if($mode==$mode_create){
    // DB登録用クエリ呼び出し
    require('./query/createAcount_query.php');
    if($mode==$errFlag||$mode==$mode_checkNg){
        // アカウント作成に失敗したとき
        echo <<<EOM
        <script type="text/javascript">
            alert("$errMessage");
        </script>
        EOM;
    }else{
        // 登録に成功したとき → ログイン画面に戻す
        echo <<<EOM
        <script type="text/javascript">
            alert('正常に登録しました。');
            window.open('./login.php','_self');
        </script>
        EOM;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/login.css">
    <title>アカウント作成</title>
</head>
<body>
    <form name="frm" action="" method="post">
        <div class="container">
            <div class="center w_400">
                <div class="txt_center">
                    <div class="w_200 l_Title">アカウント作成</div>
                </div>
                <?php
                    // エラーが発生した場合
                    if($mode==$errFlag||$mode==$mode_checkNg){
                         echo '<div style="text-align:center; color:red; margin-top:20px;margin-bottom:0;">'.$errNaiyo.'</div>';
                    }
                ?>
                <div class="l_inputarea">
                    ユーザーID：<input type="text" id="userId" name="userId" maxlength="10" value="<?php echo $userId?>"><br/>
                    パスワード：<input type="password" id="password" name="password" maxlength="20" value="<?php echo $password?>"><br/>
                    名前(漢字)：<input type="text" id="nameKanji" name="nameKanji"  maxlength="50" value="<?php echo $nameKanji?>"><br/>
                    名前(かな)：<input type="text" id="nameKana" name="nameKana" maxlength="50" value="<?php echo $nameKana?>"><br/>
                </div>
                <div class="l_btnArea">
                    <input type="button" id="reLogin" name="reLogin" value="戻る">
                    <input type="button" id="aCreate" name="aCreate" value="作成"><br/>
                </div>
            </div>
        </div>
        <input type="hidden" id="mode" name="mode" value="$mode">
    </form>
<script src="./js/common.js"></script>
<script src="./js/createAcount.js"></script>
</body>
</html>