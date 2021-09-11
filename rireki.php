<?php
  if(!isset($_POST['login_Id'])){
    header('Location: ./login.php');
  }
  if(!isset($_POST['beforeMonth'])){
    $beforeMonth = 1;    
  }else{
    $beforeMonth = $_POST['beforeMonth'];
  }
  $login_Id = $_POST['login_Id'];
  $page = $_REQUEST['page'];
  $limit_start = 10*($page-1);
  require('./query/todo_rirekiSelect_query.php');
  $maxPage = ceil($rowNum / 10);
  $selected1="";
  $selected6="";
  $selected12="";
  $selected0="";
  if($beforeMonth==1){
    $selected1="selected";
  }else if($beforeMonth==6){
    $selected6="selected";
  }else if($beforeMonth==12){
    $selected12="selected";
  }else{
    $selected0="selected";
  }
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/index.css">
    <title>Todo 履歴</title>
</head>
<body>
  <div class="center w_700 m_auto">
    <header class="header">
        <h1 class="title">Todo 履歴</h1>
    </header>
    <div class="w_500 in_todo">
      <select id="beforeMonth_SelectBox" name="beforeMonth_SelectBox" onchange="f_bsChange();">
          <option value="1"<?php echo $selected1?>>1カ月以内</option>
          <option value="6"<?php echo $selected6?>>6カ月以内</option>
          <option value="12"<?php echo $selected12?>>1年以内</option>
          <option value="0"<?php echo $selected0?>>全て</option>
      </select>
    </div>
    <div class="w_800 m_auto m_t10">
        <table class="m_auto b1">
            <thead>
                <tr>
                  <th class="b1 w_20 bg_water">No</th>
                  <th class="b1 w_200 bg_water">Todo</th>
                  <th class="b1 w_80 bg_water">完了状況</th>
                  <th class="b1 w_80 bg_water">目標達成</th>
                  <th class="b1 w_200 bg_water">反省</th>
                  <th class="b1 w_70 bg_water">終了日</th>
                  <!-- 削除機能は一旦なしでリリース -->
                  <!-- <th class="b1 w_100">削除</th> -->
                </tr>
            </thead>
            <tbody>
                <?php
                for($i=0;$i<count($result);$i++){
                  echo '<tr>';
                  $No_st = 10*($page-1);
                  $No = ($i+1)+$No_st;
                  echo '<td class="b1 w_20">'.$No.'</td>';//No
                  $todo_shoryaku = mb_substr($result[$i]['todo'], 0, 10);
                  if(mb_strlen($result[$i]['todo'])>=10){
                    $todo_shoryaku=$todo_shoryaku.'...';
                  }
                  echo '<td class="b1 w_200"><a href="javascript:alert(`'.$result[$i]['todo'].'`);">'.$todo_shoryaku.'</a>
                  <input type="hidden" value="'.$result[$i]['todoId'].'"></td>';//TodoとTodoId
                  if($result[$i]['終了フラグ']==0){
                    $kanryoJokyo='未完了';
                  }else{
                    $kanryoJokyo='完了';
                  }
                  echo '<td class="b1 w_80">'.$kanryoJokyo.'</td>';//完了状況
                  if($result[$i]['目標達成フラグ']==0){
                    $tasseiJokyo='';
                  }else if($result[$i]['目標達成フラグ']==1){
                    $tasseiJokyo='達成';
                  }else{
                    $tasseiJokyo='未達';
                  }
                  echo '<td class="b1 w_80">'.$tasseiJokyo.'</td>';//目標達成
                  $hansei_shoryaku = mb_substr($result[$i]['反省'],0,10);
                  if(mb_strlen($result[$i]['反省'])>=10){
                    $hansei_shoryaku = $hansei_shoryaku.'...';
                  }
                  echo '<td class="b1 w_200">'.$hansei_shoryaku.'</td>';//反省
                  if($result[$i]['終了日時'] == null){
                    $shuryobi = '';
                  }else{
                    $shuryobi = date('Y/m/d',  strtotime($result[$i]['終了日時']));
                  }
                  echo '<td class="b1 w_70">'.$shuryobi.'</td>';//終了日
                  // echo '<td class="b1 w_100"><input type="button" class="w_100" value="削除"></td>';//削除--一旦なしでリリース
                  echo '</tr>';
                }
                ?>
            </tbody>
        </table>
        <div class="txt_center">
          <?php
          $beforePage = $page-1;
          $nextPage = $page+1;
          if($maxPage>5){
            if($page==1){
              // 1ページ目だった場合
              echo $page;
              echo '/';
              echo '<a class="" href="javascript:next_page('.$nextPage.');">'.$nextPage.'</a>';
              echo '/...';
              echo '<a class="" href="javascript:next_page('.$maxPage.');">'.$maxPage.'</a>';
            }else if($page==$maxPage){
              // 最終ページだった場合
              echo '<a class="" href="javascript:next_page(1);">1</a>';
              echo '.../';
              echo '<a class="" href="javascript:next_page('.$beforePage.');">'.$beforePage.'</a>';
              echo '/';
              echo $page;
            }else{
              // 間のページ
              if(!($beforePage<=1)){
                echo '<a class="" href="javascript:next_page(1);">1</a>';
                echo '...';
              }
              echo '<a class="" href="javascript:next_page('.$beforePage.');">'.$beforePage.'</a>';
              echo '/';
              echo $page;
              echo '/';
              echo '<a class="" href="javascript:next_page('.$nextPage.');">'.$nextPage.'</a>';
              if($nextPage!=$maxPage){
                echo '...';
                echo '<a class="" href="javascript:next_page('.$maxPage.');">'.$maxPage.'</a>';
              }
            }
          }else{
            for($i=1; $i<=$maxPage;$i++){
              if($i==$page){
                echo $page;
              }else{
                echo '<a class="" href="javascript:next_page('.$i.');">'.$i.'</a>';
              }
              if($i!=$maxPage){
                echo '/';
              }
            }
          }
          ?>
        </div>
    </div>
    <form name="frm" action="" method="post">
        <input type="hidden" id="login_Id" name="login_Id" value="<?php echo $login_Id?>">
        <input type="hidden" id="page" name="page" value="">
        <input type="hidden" id="beforeMonth" name="beforeMonth" value="">
    </form>
    <div class="w_500 m_auto" style="text-align: center;">
      <a class="" href="javascript:open_todo();">戻る</a><br/>
    </div>
  </div>
  <script src="./js/jquery.min.js"></script>
  <script src="./js/const.js"></script>
  <script src="./js/common.js"></script>
  <script src="./js/rireki.js"></script>
</body>
</html>