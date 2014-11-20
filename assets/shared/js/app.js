$.bigfoot();

;$(function() { 
    $('body').on('click', "a[href^='http']", function() { 
        var url = $(this).attr('href');
        ga('send', 'event', 'outbound', 'click', url, {'hitCallback':
            function () {}
        });
    });
});

;$(function() { 
	var wrapper = $('<div class="img-wrapper"></div>');
	$('.feature-doc img').not('.feature-doc .section img').wrap(wrapper);
    $('img.framed').not('.feature-doc .section img').wrap(wrapper);

	$("a[href^='http']").attr('target', '_blank');
});


;$(function() {

    $('body').on('click', '.show-more-list a.show-more', function() {
        var list = $(this).closest('ul');
        list.find('li').show();
        $(this).hide();
        e.preventDefault();
    });

});

;$(function() {
    $('.unslider').unslider({
        dots: true,
        fluid: true,
        speed: 500,
        delay: 5000,
        keys: true
    });
});


;$(function() {
    $('body').on('click', '.feature-filters a', function(e) {
        var $this = $(this),
            $filters = $this.closest('.feature-filters'),
            $features = $this.closest('.features'),
            $description = $filters.find('.filter-description');
            tag = $this.data('filter-tags');

        $filters.find('a.active').removeClass('active');
        $this.addClass('active');

        $features.find('.feature').hide();
        $features.find('.feature[data-filter-tags~="' + tag + '"]').show();

        $description.html($this.siblings('p').html());

        e.preventDefault();
    });
});





