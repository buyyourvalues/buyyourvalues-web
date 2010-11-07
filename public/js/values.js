var BYV = {};

var closeTree = function() {
    $('.shown').each(function () {
        $(this).find('ul').slideUp();
        $(this).removeClass('shown');
    });
}

var update_chart = function(data) {
    var total = 0;
    $.each(data, function(i, obj) {
        total += obj.amount;
    });

    var values = [];
    var labels = [];
    var colors = [];

    $.each(data, function(i, obj) {
        values.push((obj.amount / total) * 100);
        labels.push(obj.party);
        colors.push(obj.color);
    });

    var url =
        "http://chart.apis.google.com/chart?cht=p&chs=400x160&chd=t:" +
        values.join() + "&chl=" + labels.join('|') + '&chf=bg,s,F0F0F000&chco=' + colors.join();
    $('img#chart-img').attr('src', url);
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

    initialize_map();
});
