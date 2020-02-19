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

$.ajax({
    url: 'http://localhost:8080/api/v1/admin/data/category',
    success: function (response) {
        // console.log(response);
        var colorAry = ['#a1488e', '#f6941d', '#003366', '#219167', '#fbb417', '#3366cc', '#cdd541', '#99cc33', '#3f9337', '#239676', '#24998d', '#1f9baa', '#0080ff', '#333399', '#c71585', '#bd2158'];
        var cateAry = [];
        var objAry = [];
        for (let i = 0; i < response.date.length; i++) {
            objAry.push({ value: response.date[i]['articles'], name: response.date[i]['name'] });
            cateAry.push(response.date[i]['name']);
        }
        // console.log(objAry);
        var oPieopt = {
            title: {
                top: 10,
                text: '分类文章数量比',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: colorAry.slice(0, response.date.length),
            legend: {
                x: 'center',
                top: 65,
                // data: ['奇趣事', '会生活', '爱旅行', '趣美味']
                data: cateAry,
            },
            toolbox: {
                show: true,
                x: 'center',
                top: 35,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['45%', '60%'],
                center: ['50%', '65%'],
                data: objAry
            }]
        };
        oPie.setOption(oPieopt);
    }
})
