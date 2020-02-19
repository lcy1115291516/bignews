
var cateId = getUrlParams('categoryID');

$.ajax({
    url: 'http://localhost:8080/api/v1/index/search',
    data: {
        type: cateId,
    },
    success: function (response) {
        console.log(response);
        var html = template('wenzhang', {
            data: response.data.data
        });
        $('#lastBox').html(html);
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
            type: cateId,
            page: p
        },
        success: function (response) {
            console.log(response);
            var html = template('wenzhang', {
                data: response.data.data
            });
            $('#lastBox').html(html);
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
