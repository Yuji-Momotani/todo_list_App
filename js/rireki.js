// 戻るボタン用
function open_todo(){
    document.frm.action = "./index.php";
    document.frm.submit();
}

// ページング用関数
function next_page(send_Page){
    let bs_value = document.getElementById('beforeMonth_SelectBox').value;
    document.getElementById('beforeMonth').value=bs_value;
    document.getElementById('page').value=send_Page;
    document.frm.action = "./rireki.php";
    document.frm.submit();
}

// 〇ヶ月前のセレクトボックス変更時
function f_bsChange(){
    let bs_value = document.getElementById('beforeMonth_SelectBox').value;
    document.getElementById('beforeMonth').value=bs_value;
    document.getElementById('page').value=1;
    document.frm.action = "./rireki.php";
    document.frm.submit();
}