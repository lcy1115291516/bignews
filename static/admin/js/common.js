// 文章搜索
// alert(1)
$("#uisearchbar").on('click', function () {
    // alert(1)
    // 获取输入内容的关键字
    var keys = new FormData($("#searchForm")[0]);
    // console.log(key.get('key'));
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: { key: keys },
        processData: false,
        contentType: false,
        success: function (result) {
            // console.log(result);
            $('iframe').prop('src', 'article_list.html?key=' + keys);
        }
    })
});
