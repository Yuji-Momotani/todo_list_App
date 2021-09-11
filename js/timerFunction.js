// document.write("<script src=\"./js/const.js\"></script> ");

// **********************************
// *タイマーで使用する関数
// **********************************
let timer1; //タイマーを格納する変数（タイマーID）の宣言

//カウントダウン関数を1000ミリ秒毎に呼び出す関数
function cntStart(startBtn,t_min,t_sec)
{
	document.getElementById(startBtn).disabled=true;
	timer1=setInterval(function(){countDown(startBtn,t_min,t_sec)},1000);
}

//タイマー停止関数
function cntStop(startBtn)
{
	if(startBtn != undefined){
		document.getElementById(startBtn).disabled=false;
	}
	clearInterval(timer1);
}

//カウントダウン関数
function countDown(startBtn,t_min,t_sec)
{
	let min=document.getElementById(t_min).value;
	let sec=document.getElementById(t_sec).value;
	
	if( (min=="") && (sec=="") )
	{
		alert("時刻を設定してください！");
		reSet(startBtn,t_min,t_sec);
	}
	else
	{
		if (min=="") min=0;
		min=parseInt(min);
		
		if (sec=="") sec=0;
		sec=parseInt(sec);
		
		tmWrite(min*60+sec-1 ,startBtn ,t_min ,t_sec);
	}
}

//残り時間を書き出す関数
function tmWrite(int,startBtn,t_min,t_sec)
{
	int=parseInt(int);
	
	if (int<=0)
	{
		reSet(startBtn,t_min,t_sec);
		document.getElementById('mokuhyouTime_Flg').value='-1';
		// //何個目のタスクかを取得
		let targetListNum = startBtn.replace(/[^0-9]/g, '');
		// //時間オーバーしたタスクの各ボタンを使用不可にする。
		let delBtnTarget = 'delBtn' + targetListNum;
		let startBtnTarget = 'start_btn' + targetListNum;
		let stopBtnTarget = 'stop_btn' + targetListNum;
		document.getElementById(delBtnTarget).disabled = true;
		document.getElementById(startBtnTarget).disabled = true;
		document.getElementById(stopBtnTarget).disabled = true;

	}
	else
	{
		//残り分数はintを60で割って切り捨てる
		document.getElementById(t_min).value=Math.floor(int/60);
		//残り秒数はintを60で割った余り
		document.getElementById(t_sec).value=int % 60;
	}
}

//フォームを初期状態に戻す（リセット）関数
function reSet(startBtn,t_min,t_sec)
{
	document.getElementById(t_min).value="0";
	document.getElementById(t_sec).value="0";
	document.getElementById(startBtn).disabled=false;
	clearInterval(timer1);
}  