// 匿名函数自调用,封装作用域
(function(){
    // 封装的私有方法,只能在内部调用
    var init = function(){
        var xhr = new XMLHttpRequest();
        if(!xhr){
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        return xhr;
    }
    // 封装get方法
    var get = function(url,f,type){
        var xhr = init();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                // 判断传递的数据
                if(type == ''){
                    var data = xhr.responseText;
                    f(data);
                }else if(type == 'json'){
                    var da = xhr.responseText;
                    var data = JSON.parse(da);
                    f(data);
                }else if(type == 'xml'){
                    var xml = xhr.responseXML;
                    f(xml);
                }else{
                    var data = xhr.responseText;
                    f(data);
                }
                
            }
        }
        xhr.open('get',url);
        xhr.send();
    }
    // 给window添加一个属性，方便外面调用
    window.$ = {};
    window.$.get = get;
    // 封装post方法
    
})();