function getUrlParams(name) {

    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}
//获取到浏览器地址栏中的关键字
var key = getUrlParams('key');
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/search',
    data: {
        key: decodeURI(key)
    },
    success: function (response) {
        console.log(response);

        var html = template('searchTpl', {
            data: response.data.data
        });
        $('#lasteBox').html(html);

    }
})