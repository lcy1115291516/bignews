
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function (response) {
        var html = template('categoryTpl', response);
        $('#categoryBox').html(html);
    }
})
// 新增
$('#model_add').on('click', function () {
    var data = $('#add').serialize();
    if ($("#recipient-id").val() == "") {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/category/add',
            data: data,
            success: function (response) {
                alert(response.msg)
                location.reload()
            },
            error: function (err) {
                alert(err.responseJSON.msg)
                location.reload()
            }
        })
    } else {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/category/edit',
            data: data,
            success: function (response) {
                alert(response.msg)
                location.reload()
            },
            error: function (err) {
                alert(err.responseJSON.msg)
                location.reload()
            }
        })
    }

});
$("#xinzengfenlei").on("click", function () {
    $("#recipient-id").val("");
    $("#recipient-name").val("");
    $("#recipient-slug").val("");
    $("#model_add").text("新增")
});
$('#categoryBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/category/search',
        data: { id: id },
        success: function (response) {
            $("#recipient-id").val(response.data[0].id);
            $("#recipient-name").val(response.data[0].name);
            $("#recipient-slug").val(response.data[0].slug);
            $("#model_add").text("修改")

        }

    })
});
$('#categoryBox').on('click', '.delete', function () {
    if (confirm('确定删除吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/category/delete',
            data: { id: id },
            success: function () {
                alert('删除成功');
                location.reload();
            },
            erroy: function () {
                alert('删除失败')
            }
        })
    }
})