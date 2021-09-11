
// **********************************
// *Todoリストを追加する関数
// **********************************
const txt_addTodo = document.getElementById('txt_addTask');
const login_id = document.getElementById('login_Id');
let listNum = 0;

document.getElementById('logout').addEventListener('click',logout);

//登録ボタン用関数
function addTodo(todo_id,todo){
    let addTodoValue;
    let id_value = login_id.value;
    let tuikaFlg = false;
    if(todo_id == undefined && todo == undefined){
        addTodoValue = txt_addTodo.value;
        tuikaFlg = true;
    }else{
        addTodoValue = todo;
    }
    if(addTodoValue.trim() == ""){
        alert("何も入力されていません。");
        return;
    }
    listNum++;
	//Todoリストの作成
	createTodoList(listNum,addTodoValue,todo_id);
	//タイマーの作成
    createTimer(listNum);
    //DBにデータを挿入
    if(tuikaFlg){
        insert_todo(id_value,addTodoValue,listNum);
    }

	
    txt_addTodo.value = "";
}

//削除ボタン用関数
function todoDel(liTask,liTimerId,listNum){
    if(!confirm('本当に削除しますか？')){
        return;
    }
    delete_todo(listNum);
    liTask.remove();
    let liTimer = document.getElementById(liTimerId);
    liTimer.remove();
}

//ストップボタン用関数
function todo_Stop(strtBtnIdName,listNum){
    var n_flg = document.getElementById('nowTask').value;
    if(n_flg != listNum){
        return;
    }
    cntStop(strtBtnIdName);
    
}

//完了ボタン用関数
function todoFin(listNum){
    var n_flg = document.getElementById('nowTask').value;
    if(listNum!=n_flg){
        if(!confirm('そのタスクはまだ開始されていませんが、終了しますか？\n(不要になったタスクの場合「削除」ボタンを押してください。)')){
            return;
        }
    }
    if(!confirm('タスクを終了としてもよろしいですか?')){
        return;
    }	
    let delBtnTarget = 'delBtn' + listNum;
    let compBtnTarget = 'compBtn' + listNum;
    let startBtnTarget = 'start_btn' + listNum;
    let stopBtnTarget = 'stop_btn' + listNum;
    let finFlg = 'finishFlg' + listNum;
    let todoVal = 'todo' + listNum;
    let listId = 'listId'+listNum;
    let timer = 'timer'+listNum;
    let ft_id = 'finishTime'+listNum;

    document.getElementById(delBtnTarget).disabled = true;
    document.getElementById(compBtnTarget).disabled = true;
    document.getElementById(startBtnTarget).disabled = true;
    document.getElementById(stopBtnTarget).disabled = true;
    let todo = document.getElementById(todoVal);
    //hidden項目のフラグを終了にする--->これいる？
    document.getElementById(finFlg).value = todoFinish;

    var result_time = document.getElementById('mokuhyouTime_Flg').value;
    var hansei_msg = "";
    if(result_time == 1){
        // 時間内に終わった場合
        alert('時間内にタスクが終わりました。お疲れ様でした。');
        //タイマーをストップ
        cntStop();
        todo.classList.toggle('complete');
        document.getElementById('multiTaskFlg').value='0';
        document.getElementById('nowTask').value='';
    }else{
        alert("時間内にタスクが終わりませんでした。反省点を記載しましょう。");
		//何個目のタスクかを取得
        //反省点を書く、テキストエリアを作成
		createHanseiTxt(listNum);
		//時間オーバーしたタスクの各ボタンを使用不可にする。
		let compBtnTarget = 'compBtn' + listNum;
		document.getElementById(compBtnTarget).disabled = true;
        //(HTML)classを書き換えてスタイルを調整(マージン)
        let timerId = "timer"+listNum;
        let timer = document.getElementById(timerId);
    	timer.classList.remove("m_b50");
    	timer.classList.add("m_b10");

        document.getElementById('hanseiFlg').value='1';

		let targetTaskList = "todo" + listNum;
		document.getElementById(targetTaskList).classList.add('timeOver');
    }
    update_todo_end(result_time,listNum);
    document.getElementById('mokuhyouTime_Flg').value = "1";
}

//スタートボタン用関数
function todo_Start(startBtn,t_min,t_sec,listNum){
    var h_flg = document.getElementById('hanseiFlg').value;
    var m_flg = document.getElementById('multiTaskFlg').value;
    var n_flg = document.getElementById('nowTask').value;
    if(h_flg=='1'){
        alert('反省を記載して、次のタスクに移ってください。');
        return;
    }
    if(m_flg==1 && !(n_flg==listNum)){
        alert('マルチタスクは効率が悪いので、やめましょう。一つ一つ確実に！！');
        return;
    }

    document.getElementById('multiTaskFlg').value='1';
    document.getElementById('nowTask').value=listNum;
    update_todo_start(listNum);
    cntStart(startBtn,t_min,t_sec);
}

// 要素の削除
function removeElement(...el){
    el.forEach(element => {
        let target = document.getElementById(element);
        target.remove();
    });
}

function txt_TodoEnter(code){
    if(code == 13){
        addTodo();
    }
}

function open_rireki(){
    document.frm2.action = "./rireki.php";
    document.frm2.submit();
}

// ログアウトボタン用
function logout(){
    if(confirm('ログアウトしますか？')){
        window.location.href = './logout.php';
    }
}

// ***************************************************************
// 非同期でtodoを登録
// send_id:ログインID、send_todo:登録するtodo、listNum:何行目のtodoか
// ***************************************************************
function insert_todo(send_id,send_todo,listNum){
    $.ajax({
      // 送信方法
      type: "POST",
      // 通信先ファイル名
      url: "./query/todo_Insert_query.php",
      // 受け取りデータの種類
      datatype: "json",
      data:{
        id: send_id,
        todo: send_todo,
      },
      // 通信が成功した時
      success: function(dataResult) {
        var dataResult = JSON.parse(dataResult);
        if(dataResult.statusCode == 200){
            let todo_id = dataResult.todoId;
            document.getElementById('todoId_hid'+listNum).value=todo_id;
        }else if(dataResult.statusCode==201){
            alert(dataResult.errMessage);
        }else if(dataResult.statusCode==999){
            alert(dataResult.errMessage);
        }
      },
      // 通信が失敗した時
      error: function(dataResult){
          // 通信失敗時の処理
          alert('ファイルの取得に失敗しました。管理者に連絡してください。' + dataResult.statusCode);
      }
    });
}

// ***************************************************************
// 非同期でtodoを削除
// listNum:何行目のtodoか
// ***************************************************************
function delete_todo(listNum){
    let send_todoId = document.getElementById('todoId_hid'+listNum).value; 
    let send_loginId = document.getElementById('login_Id').value;
    $.ajax({
        // 送信方法
        type: "POST",
        // 通信先ファイル名
        url: "./query/todo_delete_query.php",
        // 受け取りデータの種類
        datatype: "json",
        data:{
          todo_id: send_todoId,
          login_id: send_loginId,
        },
        // 通信が成功した時
        success: function(dataResult) {
          var dataResult = JSON.parse(dataResult);
          if(dataResult.statusCode == 200){
              alert('データを削除しました。');
          }else if(dataResult.statusCode==201){
              alert(dataResult.errMessage);
          }else if(dataResult.statusCode==999){
              alert(dataResult.errMessage);
          }
        },
        // 通信が失敗した時
        error: function(dataResult){
            // 通信失敗時の処理
            alert('ファイルの取得に失敗しました。管理者に連絡してください。' + dataResult.statusCode);
        }
      });
}

// ***************************************************************
// 非同期でtodoを更新 (start)
// ***************************************************************
function update_todo_start(listNum){
    let send_todoId = document.getElementById('todoId_hid'+listNum).value; 
    let send_loginId = document.getElementById('login_Id').value;
    $.ajax({
        // 送信方法
        type: "POST",
        // 通信先ファイル名
        url: "./query/todo_update_start_query.php",
        // 受け取りデータの種類
        datatype: "json",
        data:{
          todo_id: send_todoId,
          login_id: send_loginId,
        },
        // 通信が成功した時
        success: function(dataResult) {
          var dataResult = JSON.parse(dataResult);
          if(dataResult.statusCode == 200){
          }else if(dataResult.statusCode==201){
              alert(dataResult.errMessage);
          }else if(dataResult.statusCode==999){
              alert(dataResult.errMessage);
          }
        },
        // 通信が失敗した時
        error: function(dataResult){
            // 通信失敗時の処理
            alert('ファイルの取得に失敗しました。管理者に連絡してください。' + dataResult.statusCode);
        }
    });
}

// ***************************************************************
// 非同期でtodoを更新
// time_result:時間に終わった場合=1,タイムオーバーの場合=-1、listNum:何行目のtodoか
// ***************************************************************
function update_todo_end(tasseiFlg,listNum){
    let send_todoId = document.getElementById('todoId_hid'+listNum).value; 
    let send_loginId = document.getElementById('login_Id').value;
    // let send_startTime = document.getElementById('startTime'+listNum).value;
    // let send_finishTime = document.getElementById('finishTime'+listNum).value;
    $.ajax({
        // 送信方法
        type: "POST",
        // 通信先ファイル名
        url: "./query/todo_update_end_query.php",
        // 受け取りデータの種類
        datatype: "json",
        data:{
          todo_id: send_todoId,
          login_id: send_loginId,
          t_Flg: tasseiFlg,
        },
        // 通信が成功した時
        success: function(dataResult) {
          var dataResult = JSON.parse(dataResult);
          if(dataResult.statusCode == 200){
          }else if(dataResult.statusCode==201){
              alert(dataResult.errMessage);
          }else if(dataResult.statusCode==999){
              alert(dataResult.errMessage);
          }
        },
        // 通信が失敗した時
        error: function(dataResult){
            // 通信失敗時の処理
            alert('ファイルの取得に失敗しました。管理者に連絡してください。' + dataResult.statusCode);
        }
    });
}

// ***************************************************************
// 非同期でtodoを更新(反省を登録)
// listNum:何行目のtodoか
// ***************************************************************
function f_hansei_sousin(listNum){
    let send_todoId = document.getElementById('todoId_hid'+listNum).value; 
    let send_loginId = document.getElementById('login_Id').value;
    let hansei_val = document.getElementById('txtArea'+listNum).value;
    hansei_val = hansei_val.trim();
    if(hansei_val==""){
        alert('反省内容が記載されていません。');
        return;
    }
    if(hansei_val.length>200){
        alert('反省は200文字以内で入力してください。');
        return;
    }

    $.ajax({
        // 送信方法
        type: "POST",
        // 通信先ファイル名
        url: "./query/todo_update_hansei_query.php",
        // 受け取りデータの種類
        datatype: "json",
        data:{
            todo_id: send_todoId,
            login_id: send_loginId,
            hansei: hansei_val,
        },
        // 通信が成功した時
        success: function(dataResult) {
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode == 200){
                alert('お疲れ様でした。反省を次のタスクに活かしましょう。');
                let remove_txtarea = document.getElementById('txtArea_HanseiList'+listNum);
                remove_txtarea.remove();
            }else if(dataResult.statusCode==201){
                alert(dataResult.errMessage);
            }else if(dataResult.statusCode==999){
                alert(dataResult.errMessage);
            }
            document.getElementById('hanseiFlg').value='0';
            document.getElementById('multiTaskFlg').value='0';
            document.getElementById('nowTask').value='';
        },
        // 通信が失敗した時
        error: function(dataResult){
            // 通信失敗時の処理
            alert('ファイルの取得に失敗しました。管理者に連絡してください。' + dataResult.statusCode);
        }
    });
}