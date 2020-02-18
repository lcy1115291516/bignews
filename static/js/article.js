// alert(11)
// 封装一个函数，用于从浏览器的地址栏中获取指定的参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    // 参数不存在，则返回-1
    return -1;
};
var id = getUrlParams('id');
console.log(id);


$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/article',
    data: { id: id },
    success: function (response) {
        console.log(response);
        var html = template('articleTpl', response);
        // console.log(html);

        $('#articleText').html(html)
    }
})