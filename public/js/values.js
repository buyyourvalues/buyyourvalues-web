$(function() {
    $('#search-bar').submit(function() {
        $.get('/data-load', $(this).serialize(), function(resp) {
            // TODO: render JS template from resp
        }, 'json');
        return false;
    });
});
