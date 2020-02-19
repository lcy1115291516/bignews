// import { response } from "express";


// alert(1)

// 发送请求，获取文章列表
// var display = [];
// var pages;
// // Math.ceil(totalCount / num)
// function pagedisplay(page) {
//     for (var i = 1; i <= page; i++) {
//         display.push(i);
//     };
//     return display;
// };
// console.log(pagedisplay(200, 10));
console.log(top.$('#searchArticle').val());
var newObj = {};
var postkey = decodeURI(getUrlParams('key'));
if (postkey != -1) {
    newObj.key = postkey;
}
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/article/query',
    data: newObj,
    success: function (result) {
        // console.log(result);//对象
        // pagedisplay(result.data.pages)
        // console.log(result)

        var html = template('listTpl', result);
        // console.log(html)
        $("#listBox").html(html);
        var page = template('pagelist', result);
        $("#pageBox").html(page);
    }
});
function getpage(p) {
    var obj = {};
    // 获取表单选择内容
    if ($("#selCategory").val() != "") {
        obj.type = $("#selCategory").val();
    };
    if ($("#selStatus").val() != "") {
        obj.state = $("#selStatus").val();
    };
    // 获取浏览器地址栏中的key参数

    console.log(postkey)
    if (postkey != -1) {
        obj.key = postkey;
    }
    obj.page = p;
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: obj,
        success: function (result) {
            console.log(result);//对象
            // pagedisplay(result.data.pages)
            // console.log(result)
            var html = template('listTpl', result);
            // console.log(html)
            $("#listBox").html(html);
            var page = template('pagelist', result);
            $("#pageBox").html(page);
        }
    });
}


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
    };
    if ($("#selStatus").val() != "") {
        obj.state = $("#selStatus").val();
    };
    if (postkey != -1) {
        obj.key = postkey;
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
});











// 搜索功能
// 1-获取关键字信息
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // console.log(paramsAry)
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}

