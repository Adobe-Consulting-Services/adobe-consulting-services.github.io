;$(function() { 
	var wrapper = $('<div class="img-wrapper"></div>');
	$('.feature-doc img').wrap(wrapper);

	$('a[href^="http"').attr('target', '_blank');
});


;$(function() {

    $('body').on('click', '.show-more-list a.show-more', function() {
        var list = $(this).closest('ul');
        list.find('li').show();
        $(this).hide();
        e.preventDefault();
    });

});




