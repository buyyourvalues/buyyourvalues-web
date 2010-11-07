var closeTree = function () {
    $('.shown').each(function () {
        $(this).find('ul').slideUp();
        $(this).removeClass('shown');
    });
}
$(function() {
    $('#search-bar').submit(function() {
        $.get('/data-load', $(this).serialize(), function(resp) {
            // TODO: render JS template from resp
        }, 'json');
        return false;
    });
    $(".category-li").click(function() {
        var child_ul = $(this).find('ul').eq(0);

        if ($(this).hasClass('shown'))
        {
            $(this).removeClass('shown');
            child_ul.slideUp();
        }
        else
        {
            $(this).addClass('shown');
            child_ul.slideDown();
        }

        child_ul.find('li').click(function (e) {
            e.stopPropagation();
        });
    });
});
