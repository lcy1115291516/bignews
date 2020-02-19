$.ajax({
    url: 'http://localhost:8080/api/v1/admin/user/detail',
    success: function (response) {
        console.log(response);
        var html = template('detailTpl', response.data);
        $('#formBox').html(html);
    }
})

//文件控件
$('#formBox').on('change', '#exampleInputFile', function () {
    var file = this.files[0];
    var imgURL = URL.createObjectURL(file);
    //图片的src属性
    $('#preview').prop('src', imgURL);
})


//用户信息修改
$('#formBox').on('submit', '#userForm', function () {
    //表单数据的收集
    var formData = new FormData($('#userForm')[0]);
    //发送ajax请求
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/user/edit',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            if (response.code == 200) {
                alert('修改成功');

                function loadUrl(url) {
                    if (window != top) {
                        top.location.href = url;
                        return;
                    }
                    window.location.href = url;
                }
                loadUrl('index.html')
            } else {
                alert('修改失败');
            }
            // location.href = '/admin/login.html'
        }
    })
    return false;
})
