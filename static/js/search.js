
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
});
