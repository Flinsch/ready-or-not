
readyon.bind();

readyon.onReady(function() {
    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });
});

readyon.onReadyOnce(function() {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'get',
        async: true,
        complete: function(jqXHR, textStatus) {
            var posts = jqXHR.responseJSON;
            _initPosts(posts);
        }
    });
});

$(document).on('click', 'ul.posts li', function() {
    $('ul.posts > li').removeClass('selected');
    var postId = $(this).addClass('selected').attr('data-post-id');
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/comments',
        data: { postId: postId },
        method: 'get',
        async: true,
        complete: function(jqXHR, textStatus) {
            var comments = jqXHR.responseJSON;
            _initComments(comments);
        }
    });
});

function _initPosts(posts) {
    var $posts = $('ul.posts').empty();
    for (var i = 0; i < posts.length; ++i) {
        var post = posts[i];
        var $post = $('<li/>', { 'data-post-id': post.id });
        $post.append($('<strong/>').text(post.title));
        $post.append($('<p/>').text(post.body));
        $post.appendTo($posts);
    }
}

function _initComments(comments) {
    var $comments = $('ul.comments').empty();
    for (var i = 0; i < comments.length; ++i) {
        var comment = comments[i];
        var $comment = $('<li/>', { 'title': '<strong>'+comment.email+'</strong><p>'+comment.name+'</p>', 'data-toggle': 'tooltip' });
        $comment.append($('<p/>').text(comment.body));
        $comment.appendTo($comments);
    }
}
