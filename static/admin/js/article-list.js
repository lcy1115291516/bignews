// import { response } from "express";


// alert(1)

// 发送请求，获取文章列表
var display = [];
var pages;
// Math.ceil(totalCount / num)
function pagedisplay(page) {
    for (var i = 1; i <= page; i++) {
        display.push(i);
    };
    return display;
};

$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/article/query',
    data: { perpage: 20 },
    success: function (result) {
        // console.log(result);//对象
        pagedisplay(result.data.pages);
        pages = result.data.pages;
        result.display = display;
        console.log(result)

        var html = template('listTpl', result);
        // console.log(html)
        $("#listBox").html(html);

        // 分页模板
        var page = template('pagelist', result);
        $("#pageBox").html(page);
    }
});

// 分页封装函数
function getpage(p) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: { page: p, perpage: 20 },
        success: function (result) {
            // console.log(result);//对象
            var html = template('listTpl', result);
            // console.log(html)
            $("#listBox").html(html);

            var page = template('pagelist', result);
            $("#pageBox").html(page);


        }
    });
};





// 文章删除
$("#listBox").on('click', '.delete', function () {
    // alert(1)
    var postid = $(this).attr('data-id');
    // alert(postid)
    if (confirm('请确认是否删除')) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/article/delete',
            data: { id: postid },
            success: function (result) {
                console.log(result)
            }
        })
    }
});






// 文章筛选
// 1-获取文章类别
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function (response) {
        // console.log(response);
        // 渲染类别模板
        var html = template('categoryListTpl', response);
        // console.log(html);
        $("#selCategory").html(html);
    }
});
// 2-给表单添加提交事件
$("#screen").on('submit', function () {
    // alert(1)
    var obj = {};
    // 获取表单选择内容
    if ($("#selCategory").val() != "") {
        obj.type = $("#selCategory").val();
    }
    if ($("#selStatus").val() != "") {
        obj.state = $("#selStatus").val();
    }
    // console.log(obj)
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: obj,
        success: function (result) {
            // console.log(result)
            var html = template('listTpl', result);
            // console.log(html)
            $("#listBox").html(html);

            var page = template('pagelist', result);
            $("#pageBox").html(page);

        }
    });
    return false;//阻止表单默认提交行为
})
