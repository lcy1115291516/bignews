// lcy 首页数据 start
// $.ajax({
//     url: 'http://localhost:8080/api/v1/admin/article/query',

//     success: function (response) {
//         $('#totalArticles').html(response.data.totalCount)
//     }
// })

// // 获取今日日期
// function today() {
//     var date = new Date();
//     var m = date.getMonth() + 1;
//     m = m > 9 ? m : '0' + m;
//     var d = date.getDate();
//     d = d > 9 ? d : '0' + d;
//     var today = date.getFullYear() + "-" + m + "-" + d;
//     return today;
// }


// $.ajax({
//     url: 'http://localhost:8080/api/v1/admin/data/article',
//     success: function (response) {
//         console.log(response);
//         response.date.forEach((value, index, array) => {
//             console.log(value.date, value.count);
//             if (value.date == today()) {
//                 $('#today').text(value.count);
//                 return;
//             } else {
//                 $('#today').text('0');
//             }
//         })
//     }
// })

$.ajax({
    url: 'http://localhost:8080/api/v1/admin/data/info',
    success: function (response) {
        $('#totalArticles').html(response.totalArticle);
        $('#today').html(response.dayArticle);
        $('#totalComment').html(response.totalComment);
        $('#dayComment').html(response.dayComment);
    }
});
// lcy 首页数据 
