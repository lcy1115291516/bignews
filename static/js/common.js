// 向服务器端发送请求，索要最新评论数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/latest_comment',
    success: function (response) {
        console.log(response);

        var commentTpl = `
        {{each data}}
        <li>
            <span>中</span>
            <b><em>{{$value.author}}</em> {{$value.date}}说:</b>
            <strong>{{$value.intro}}</strong>
          </li>
          {{/each}}
        `;
        var html = template.render(commentTpl, {
            data: response.data
        });
        $('#commentBox').html(html);
        console.log(html);


    }
});