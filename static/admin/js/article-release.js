// alert(1)


// 图片预览
$("#exampleInputFile").on('change', function () {
    // alert(1)
    var file = this.files[0]
    var imgURL = URL.createObjectURL(file);
    $("#preview").prop('src', imgURL)
});


// 收集表单信息，给form表单注册submit事件
// $("#publishForm").on('submit', function () {
//     // alert(1)
//     // 收集表单信息  给表单添加name属性
//     var formdata = new FormData(this);
//     var release = $(this).find('#release');
//     if (release.val() == '发布') {
//         formdata.append('state', 1)
//     }
//     console.log(formdata)
//     // 发送请求
//     $.ajax({
//         type: 'post',
//         url: 'http://localhost:8080/api/v1/admin/article/publish',
//         data: formdata,
//         processData: false,
//         contentType: false,
//         success: function (result) {
//             // console.log(result)
//             // 刷新页面
//             location.reload();
//         }
//     })
//     // 阻止表单的默认行为
//     return false;
// });




// 文章类别
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function (response) {
        // console.log(response);
        // 渲染类别模板
        var html = template('categoryTpl', response);
        // console.log(html);
        $(".articleBox").html(html);
    }
});



$("#release").on('click', function () {
    var formdata = new FormData($("#publishForm")[0]);
    formdata.append('state', '已发布');
    getdata(formdata);
});

$("#draft").on('click', function () {
    var formdata = new FormData($("#publishForm")[0]);
    getdata(formdata);
});

function getdata(data) {
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/article/publish',
        data: data,
        processData: false,
        contentType: false,
        success: function (result) {
            // console.log(result)
            // 刷新页面
            // location.reload();
        }
    })
};

