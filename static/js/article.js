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
// console.log(id);

// 渲染文章数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/article',
    data: { id: id },
    success: function (response) {
        // console.log(response);
        var html = template('articleTpl', response);
        // console.log(html);

        $('#articleText').html(html)
    }
});

// 当评论表单发生提交行为的时候
$('.left_con').on('submit', 'form', function () {
    // alert(11)
    // 获取用户名称
    var author = $(this).find('.comment_name').val();
    // console.log(author);
    // 获取评论内容
    var content = $(this).find('.comment_input').val();
    // console.log(content);
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/index/post_comment',
        data: {
            author: author,
            content: content,
            articleId: id
        },
        success: function () {
            alert('评论成功');
            location.reload();
        }
    });
    return false;
});

// 获取评论
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/get_comment',
    data: { articleId: id },
    success: function (response) {
        console.log(response);
        var html = template('textTpl', response);
        // console.log(html);
        $('#textTplm').html(html)
    }
});

function date(e) {
    var da = +new Date();
    // console.log(da);

    var date = +new Date(e);
    // console.log(date);
    var time = (da - date) / 1000;
    var d = parseInt((time) / 60 / 60 / 24);
    // var h = parseInt((time) / 60 / 60 % 24);
    // var m = Math.ceil((date - da) / 60 % 60);
    // var s = Math.ceil((date - da) % 60);
    // console.log(d + '天' + h + '时');
    // return d + '天' + h + '时'
    return Math.ceil(d)

}

// function countDown(time) {
//     var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
//     // console.log(nowTime);
//     var inputTime = +new Date(time); // 返回的是用户输入时间总的毫秒数
//     var times = (inputTime - nowTime) / 1000; // times是剩余时间总的秒数 
//     var d = parseInt(times / 60 / 60 / 24); // 天
//     d = d < 10 ? '0' + d : d;
//     var h = parseInt(times / 60 / 60 % 24); //时
//     h = h < 10 ? '0' + h : h;
//     var m = parseInt(times / 60 % 60); // 分
//     m = m < 10 ? '0' + m : m;
//     var s = parseInt(times % 60); // 当前的秒
//     s = s < 10 ? '0' + s : s;
//     return d + '天' + h + '时' + m + '分' + s + '秒';
// }
// console.log(countDown('2019-5-1 18:00:00'));
// var date = new Date();
// console.log(date);
