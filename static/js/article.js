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
        // console.log(response);
        var html = template('textTpl', response);
        // console.log(html);
        $('#textTplm').html(html)
    }
});

function date(e) {
    // 获取现在时间
    var da = +new Date();
    // console.log(da);

    var date = +new Date(e);
    // console.log(date);
    var time = (da - date) / 1000;
    var d = time / 60 / 60 / 24;

    return Math.floor(d)

}

