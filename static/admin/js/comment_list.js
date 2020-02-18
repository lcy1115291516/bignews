// 获取评论列表数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/comment/search',
    success: function (response) {
        console.log(response);
        // 评论列表数据
        var html = template('commentTpl', response);
        $('#commentBox').html(html);
        // 分页
        var pageHTML = template('pageTpl', response.data);
        console.log(pageHTML);

        $('#pageBox').html(pageHTML);
    }
})
function changePage(page) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/comment/search',
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response);
            // 评论列表数据
            var html = template('commentTpl', response);
            $('#commentBox').html(html);
            // 分页
            var pageHTML = template('pageTpl', response.data);
            $('#pageBox').html(pageHTML);
        }
    })
}
$('#commentBox').on('click', '#ratify', function () {

    if (confirm('您确定通过审核')) {
        // 修改的id
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'post',
            data: { id: id },
            url: 'http://localhost:8080/api/v1/admin/comment/pass',
            success: function () {
                alert('审核通过')
                location.reload();
            }
        })
    }
})
$('#commentBox').on('click', '#refuse', function () {
    if (confirm('您确定拒绝审核')) {
        // 修改的id
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'post',
            data: { id: id },
            url: 'http://localhost:8080/api/v1/admin/comment/reject',
            success: function () {
                alert('审核不通过')
                location.reload();
            }
        })
    }

})
$('#commentBox').on('click', '.delete', function () {
    if (confirm('确定删除吗')) {
        // 删除评论的id
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/delete',
            data: { id: id },
            success: function () {
                alert('删除成功')
                location.reload();
            },
            erroy: function () {
                alert('删除失败')
            }
        })
    }
})