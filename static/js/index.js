// alert(11)
// 最新资讯模块
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/latest',
    success: function (response) {
        console.log(response);
        var html = template('indexTpl', response);
        // console.log(html);
        $('#indexTplm').html(html)

    }
});