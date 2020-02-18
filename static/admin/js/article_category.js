
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function (response) {
        console.log(response);
        var html = template('categoryTpl', response);
        $('#categoryBox').html(html);
    }
})
$('#categoryBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/category/edit',
        data: { id: id },

    })
})
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