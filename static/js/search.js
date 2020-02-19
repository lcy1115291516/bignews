
//获取到浏览器地址栏中的关键字
var key = getUrlParams('key');
if (key) {
    $('#search').prop('placeholder', decodeURI(key))

}

$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/search',
    data: {
        key: decodeURI(key)
    },
    success: function (response) {
        console.log(response);

        var html = template('searchTpl', {
            data: response.data.data
        });
        $('#lasteBox').html(html);
        $("#searchend").html('<h3>搜索结果</h3>');
        $("#pagination").pagination({
            currentPage: response.data.page,
            totalPage: response.data.pages,
            callback: function (current) {
                changePage(current)
            }
        });

    }
});

function changePage(p) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/search',
        data: {
            key: decodeURI(key),
            page: p
        },
        success: function (response) {
            console.log(response);

            var html = template('searchTpl', {
                data: response.data.data
            });
            $('#lasteBox').html(html);
            $("#searchend").html('<h3>搜索结果</h3>');
            $("#pagination").pagination({
                currentPage: response.data.page,
                totalPage: response.data.pages,
                callback: function (current) {
                    changePage(current)
                }
            });
        }
    })
}
