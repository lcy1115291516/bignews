// alert(11)
// 最新资讯模块
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/latest',
    success: function (response) {
        // console.log(response);
        var html = template('indexTpl', response);
        // console.log(html);
        $('#indexTplm').html(html)

    }
});

// 获取热点图
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/hotpic',
    success: function (response) {
        // console.log(response);

        var html = template('imageTpl', response);
        $('#imageTpls').html(html);

        // 给第一个 li添加类名
        $(".focus_list li:first-child").addClass('first');


    }
})