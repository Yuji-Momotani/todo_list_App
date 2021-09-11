//クリアボタン押下時イベント追加
document.getElementById('clear').addEventListener('click',f_clear);
//ログインボタン押下時イベント追加
document.getElementById('login').addEventListener('click',f_login);

function f_clear(){
    document.getElementById('userId').value="";
    document.getElementById('password').value="";
}

function f_login(){
    let userId = document.getElementById('userId').value;
    let password = document.getElementById('password').value;
    const userId_Message = 'ユーザーIDは半角英数で入力してください。';
    const password_Message = 'パスワードは半角英数で入力してください。';
    //未入力チェック 
    if(userId.trim()==""){
        alert(userId_Message);
        document.getElementById('userId').focus();
        return;
    }
    if(password.trim()==""){
        alert(password_Message);
        document.getElementById('password').focus();
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
    document.getElementById('mode').value=2;
    document.frm.action = "./login.php";
    document.frm.submit();
}

function txt_loginEnter(code){
    if(code == 13){
        f_login();
    }
}