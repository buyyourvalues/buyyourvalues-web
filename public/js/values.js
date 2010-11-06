$(function() {
    $('#search-bar').submit(function() {
        $.get('/data-load', $(this).serialize(), function(resp) {
            // TODO: render JS template from resp
        }, 'json');
        return false;
    });
    $("#food-li").click(function(){
	    if($("#food-ul").is(":hidden")){
		$("#food-ul").slideDown();
	    }else{
		$("#food-ul").slideUp();
	    }
	});
    $("#entertainment-li").click(function(){
	    if($("#entertainment-ul").is(":hidden")){
		$("#entertainment-ul").slideDown();
	    }else{
		$("#entertainment-ul").slideUp();
	    }
	});
    $("#fashion-li").click(function(){
	    if($("#fashion-ul").is(":hidden")){
		$("#fashion-ul").slideDown();
	    }else{
		$("#fashion-ul").slideUp();
	    }
	});
    $("#professional-li").click(function(){
	    if($("#professional-ul").is(":hidden")){
		$("#professional-ul").slideDown();
	    }else{
		$("#professional-ul").slideUp();
	    }
	});
    $("#non-profits").click(function(){
	    if($("#non-profits-ul").is(":hidden")){
		$("#non-profits-ul").slideDown();
	    }else{
		$("#non-profits-ul").slideUp();
	    }
	});
});
