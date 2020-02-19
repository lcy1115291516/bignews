
//文章编辑
// 1-获取文章id信息
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
// 获取浏览器地址栏中的id参数
var postid = getUrlParams('postId');
// console.log(postid);
// 发送请求
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/article/search',
    data: { id: postid },
    async: false,
    success: function (result) {
        // console.log(result);//对象
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/api/v1/admin/category/list',
            success: function (res) {
                // console.log(res);
                result.category = res.data
                // console.log(result)
                // 渲染模板
                var html = template('postTpl', result);
                // console.log(html);
                $("#postBox").html(html);
                tinyMCE.activeEditor.setContent(response.data.content)
            }
        });

    }
});

// 给表单注册提交事件
$("#postBox").on('submit', '#editForm', function () {
    // alert(1)  给表单添加name属性
    var formdata = new FormData(this);
    // alert(postid)
    formdata.append('id', postid)
    // console.log(formdata.get("state"))
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/article/edit',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (result) {
            // console.log(result)
            // location.href = "http://localhost:8080/api/v1/admin/article/article_list.html"
            top.$('iframe').prop('src', 'article_list.html')
        }
    })
    return false;
})