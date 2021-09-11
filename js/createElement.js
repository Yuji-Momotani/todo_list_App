// document.write("<script src=\"./js/const.js\"></script> ");

//**********************************
//Todoリストに追加
//  listNum：何個目のタスクなのか
//  addTodoValue：追加するタスクの内容
//**********************************
function createTodoList(listNum,addTodoValue,todo_id){
    addTodoValue = addTodoValue.trim();
    //作成する各要素のId名を作成
    let listIdName = "listId" + listNum;
    let todoName = "todo" + listNum;
    let todoHidName = "todo_hid" + listNum;
    let todoIdHidName = "todoId_hid" + listNum;
    let delBtnId = "delBtn"+ listNum;
    let compBtnId = "compBtn"+ listNum;
    let listTimerId = "timer" + listNum;
    let finishFlg = "finishFlg" + listNum;

    //入力文字をリストとして表示
    let li_element = document.createElement('li');
    let li = document.getElementById('ul_el').appendChild(li_element);

    let dispTodoVal = "";
    let shouryakuFlag = false;
    //Todoリストを表示
    if(addTodoValue.length > 12){
        dispTodoVal = addTodoValue.substr(0,12) + '...';
        shouryakuFlag = true;
    }else{
        dispTodoVal = addTodoValue;
    }

    if(shouryakuFlag){
        let atag = document.createElement('a');
        atag.innerHTML = dispTodoVal;
        atag.href = 'javascript:alert("'+addTodoValue+'");';
        li.appendChild(atag);
    }else{
        let tddiv = document.createElement('div');
        tddiv.classList.add('f_left');
        tddiv.classList.add('m_l60');
        tddiv.id = todoName;
        let todoVal = li.appendChild(tddiv);
        todoVal.textContent = dispTodoVal;
    }

    li.classList.add('li_el');
    li.setAttribute("id",listIdName);
    //Todoリストの正確な情報をHiddenへ隠す
    let tdhid = document.createElement('input');
    tdhid.type = "hidden";
    tdhid.value = addTodoValue;
    tdhid.id = todoHidName;
    li.appendChild(tdhid);
    //TodoIdの情報をHiddenへ隠す
    let tdIdhid = document.createElement('input');
    tdIdhid.type = "hidden";
    tdIdhid.value = todo_id!= undefined?todo_id:"";
    tdIdhid.id = todoIdHidName;
    li.appendChild(tdIdhid);
    //todoの完了状態を保持する項目(Hidden)
    var fFlghid = document.createElement('input');
    fFlghid.type = 'hidden';
    fFlghid.name = finishFlg;
    fFlghid.id = finishFlg;
    fFlghid.value = todoShoki;
    document.getElementById(listIdName).appendChild(fFlghid);

    //完了、削除ボタン作成
    let button_element1 = document.createElement('button');
    let button_element2 = document.createElement('button');
    button_element1.type="button";
    button_element2.type="button";
    let bt1 = document.getElementById(listIdName).appendChild(button_element1);
    let bt2 = document.getElementById(listIdName).appendChild(button_element2);
    bt1.textContent = "削除";
    bt2.textContent = "完了";
    bt1.setAttribute("id",delBtnId);
    bt2.setAttribute("id",compBtnId);
    let listTask = document.getElementById(listIdName);

	//ボタンにファンクションを追加
    document.getElementById(delBtnId).addEventListener('click',function(){
        todoDel(listTask,listTimerId,listNum);
    });
    document.getElementById(compBtnId).addEventListener('click',function(){
        todoFin(listNum);
    });
    txt_addTodo.value = "";
}

//**********************************
//タイマー作成作
//  listNum：何個目のタスクなのか
//**********************************
function createTimer(listNum){
    //各要素のId名の作成
    let timer = "timer"+ listNum;
	let tminIdName = "timer_min"+ listNum;
	let tsecIdName = "timer_sec"+ listNum;
	let strtBtnIdName = "start_btn"+ listNum;
	let stopBtnIdName = "stop_btn"+ listNum;

    //タイマーの作成
    let t_li = document.createElement('li');
    let tm = document.getElementById('ul_el').appendChild(t_li);
	tm.setAttribute("id",timer);
	tm.classList.add("m_b50");
	let tm_min = document.createElement('input');
    let tm_sec = document.createElement('input');
	let tmin = tm.appendChild(tm_min);
	let tsec = tm.appendChild(tm_sec);
	var txt_min = document.createElement('p').textContent = '分';
	tmin.after(txt_min);
	var txt_sec = document.createElement('p').textContent = '秒';
	tsec.after(txt_sec);
    tmin.setAttribute("id",tminIdName);
    tsec.setAttribute("id",tsecIdName);
    tmin.classList.add('w_30');
    tsec.classList.add('w_30');
	let start_btn = document.createElement('button');
	let stop_btn = document.createElement('button');
	let startBtn = tm.appendChild(start_btn);
	let stopBtn = tm.appendChild(stop_btn);
	startBtn.setAttribute("id",strtBtnIdName);
	stopBtn.setAttribute("id",stopBtnIdName)
	startBtn.textContent = "スタート";
	stopBtn.textContent = "ストップ";
	startBtn.type = "button";
	stopBtn.type = "button";

	//タイマーのボタンにファンクションを追加
    document.getElementById(strtBtnIdName).addEventListener('click',function(){
        todo_Start(strtBtnIdName,tminIdName,tsecIdName,listNum);
	});
    document.getElementById(stopBtnIdName).addEventListener('click',function(){
        todo_Stop(strtBtnIdName,listNum);
	});
}

//**********************************
//反省点を記載するテキストエリアを作成
//  startBtn：何個目のタスクなのかを取得する用
//**********************************
function createHanseiTxt(targetListNum){
    // 各Id名作成
    let txtAreaListIdName = "txtArea_HanseiList" + targetListNum;
    let txtAreaIdName = "txtArea" + targetListNum;
    //何個目のTimerIdの後にテキストエリアを挿入するか
    let timerIdName = "timer" + targetListNum;
    //テキストエリアの親作成
    let txt_li = document.createElement('li');
    document.getElementById(timerIdName).after(txt_li);
    let targetTxt = document.getElementById(timerIdName).nextElementSibling;
    targetTxt.setAttribute("id",txtAreaListIdName);
	targetTxt.classList.add("m_b50");

    // テキストエリアの作成
    let txtArea_element = document.createElement('textarea');
    let txtArea = targetTxt.appendChild(txtArea_element);
    txtArea.classList.add('w_250');
    txtArea.classList.add('h_50');
    txtArea.setAttribute("id",txtAreaIdName);
    txtArea.setAttribute("maxlength","200");

    // 送信ボタンの作成
    let sousin_button = document.createElement('button');
    sousin_button.type = 'button';
    sousin_button.textContent = '送信';
    let sousin_buttonId = "hansei_btn"+targetListNum;
    
    sousin_button.classList.add('w_70');
    sousin_button.classList.add('h_25');
    sousin_button.classList.add('f_right');
    sousin_button.classList.add('m_t30');
    sousin_button.setAttribute("id",sousin_buttonId);
    let target = document.getElementById(txtAreaIdName);
    target.after(sousin_button);
    
    document.getElementById(sousin_buttonId).addEventListener('click',function(){
        f_hansei_sousin(targetListNum);
    });
}