/**
 * Created by Administrator on 2017/1/4.
 */
let Tools = {
    getUserId:function () {
    var Info=window.sessionStorage.getItem("userInfo")?JSON.parse(window.sessionStorage.getItem("userInfo")):JSON.parse(window.localStorage.getItem("userInfo"));
       if (Info){
           var useID=Info.userID;
           return useID
       }else {
           alert("请先登录")
       }

    },
    setHistroy:function (val) {
            //进行浏览记录的存储
            if (window.localStorage.getItem("histroy")){
                var a = window.localStorage.getItem("histroy");
                if (a.indexOf(val+"|")<0){
                    var b = val+"|"+a;
                    window.localStorage.setItem("histroy",b)
                }else {
                    // var index = a.indexOf(val);
                    var arr1 =  a.replace("|"+val+"|","|"); //删除重复字符之后的字符串
                    var d = val+"|";
                    var newa = d.concat(arr1);
                    window.localStorage.setItem("histroy",newa)
                }
            }else {
                window.localStorage.setItem("histroy",val+"|")
            }
    },
    getHistroy:function (val) {
        if (window.localStorage.getItem(val)){
            var hisStr =  window.localStorage.getItem(val);
            var arr = hisStr.split("|");
            return arr
        }

    },
    delLocalStorage:function (val) {
        window.localStorage.removeItem(val);
        document.location.reload()
    }

}

export {Tools}

