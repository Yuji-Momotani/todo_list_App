//戻るボタン押下時イベント追加
document.getElementById('reLogin').addEventListener('click',f_reLogin);
//作成ボタン押下時イベント追加
document.getElementById('aCreate').addEventListener('click',f_create);

function f_reLogin(){
    if(confirm('アカウントは作成されていません。戻りますか？')){
        window.open('./login.php','_self');
    }
}

function f_create(){
    let userId = document.getElementById('userId').value;
    let password = document.getElementById('password').value;
    let nameKanji = document.getElementById('nameKanji').value;
    let nameKana = document.getElementById('nameKana').value;

    //*****************
    //* 各入力チェック
    //*****************

    //未入力チェック 
    if(userId.trim()==""){
        alert('ユーザーIDを入力してください。');
        document.getElementById('userId').focus();
        return;
    }
    if(password.trim()==""){
        alert('パスワードを入力してください。');
        document.getElementById('password').focus();
        return;
    }
    if(nameKanji.trim()==""){
        alert('名前(漢字)を入力してください。');
        document.getElementById('nameKanji').focus();
        return;
    }
    if(nameKana.trim()==""){
        alert('名前(かな)を入力してください。');
        document.getElementById('nameKana').focus();
        return;
    }
    //半角英数チェック
    if(!userId.isHanEisu()){
        alert('ユーザーIDは半角英数で入力してください。');
        document.getElementById('userId').focus();
        document.getElementById('userId').select();
        return;
    }
    if(!password.isHanEisu()){
        alert('パスワードは半角英数で入力してください。');
        document.getElementById('password').focus();
        document.getElementById('password').select();
        return;
    }
    //文字チェック(コピペでも入力できないので必要ないかも)
    if(userId.lenght>10){
        alert('ユーザーIDは10文字以内で入力してください。');
        document.getElementById('userId').focus();
        document.getElementById('userId').select();
        return;
    }

    // 登録最終確認
    if(!confirm('登録しますか？')){
        return;
    }
    document.getElementById('mode').value=2;
    document.frm.action = "./createAcount.php";
    document.frm.submit();
}