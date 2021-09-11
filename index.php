<?php
  // URLで直接遷移してきた場合はログイン画面へ戻す
  if(!isset($_POST['login_Id'])){
    header('Location: ./login.php');
  }else{
    $login_Id = $_POST['login_Id'];
  }
  require('./query/todo_loadSelect_query.php');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/index.css">
    <script src="./js/common.js"></script>
    <title>Todoリスト</title>
</head>
<body>
  <div class="center w_700 m_auto">
    <header class="header">
        <h1 class="title">Todo リスト</h1>
    </header>
    <div class="w_500 in_todo">
      <input class="" id="txt_addTask" type="text" onkeypress="txt_TodoEnter(event.keyCode);">
      <input class="" id="addTask_btn" type="button" value="登録" onclick="addTodo();">
    </div>
    <form action="" method="post" name="frm" class="h_500 w_500 frm_style">
      <ul id="ul_el" class="w_400 m_auto">

      </ul>
    </form>
    <div class="w_500 m_auto" style="text-align: center;">
      <a class="" href="javascript:open_rireki();">履歴(過去のTodo一覧)</a><br/>
      <input class="m_l30" id="logout" type="button" value="ログアウト">
    </div>
    <input type="hidden" id="hanseiFlg" name="hanseiFlg" value="0">
    <input type="hidden" id="multiTaskFlg" name="multiTaskFlg" value="0">
    <input type="hidden" id="nowTask" name="nowTask" value="">
    <input type="hidden" id="mokuhyouTime_Flg" name="mokuhyouTime_Flg" value="1">
    <form action="./rireki.php" method="POST" name="frm2">
      <input type="hidden" id="login_Id" name="login_Id" value="<?php echo $login_Id;?>">
      <input type="hidden" id="page" name="page" value="1">
    </form>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="./js/jquery.min.js"></script>
  <script src="./js/const.js"></script>
  <script src="js/timerFunction.js"></script>
  <script src="js/createElement.js"></script>
  <script src="js/index.js"></script>
  <?php
    // ログインIDを元に終了していないTodoがあれば、初期表示
    while($result = $data->fetch()){
      $todoId_val = $result['todoId'];
      $todo_val = $result['todo'];
      echo <<<EOM
      <script type="text/javascript">
      addTodo('$todoId_val','$todo_val');
      </script>
      EOM; 
    }
  ?>
</body>
</html>