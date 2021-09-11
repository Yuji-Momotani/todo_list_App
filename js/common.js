// もしtrimメソッドがない場合のために
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\xA0]+|[\s\xA0]+$/g, '');
  };
}

//半角英数チェック
String.prototype.isHanEisu = function(){
    // str = (str==null)?"":str;
    if(this.match(/^[A-Za-z0-9]*$/)){
      return true;
    }else{
      return false;
    }
}

//半角数字チェック
String.prototype.isHansu = function(){
    // str = (str==null)?"":str;
    if(this.match(/^[0-9]*$/)){
      return true;
    }else{
      return false;
    }
}


//バイト数チェック
String.prototype.bytes = function () {
    return(encodeURIComponent(this).replace(/%../g,"x").length);
}