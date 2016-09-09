$('document').ready(function(){
	$('.animated-gif').gifplayer();

	$('.open-menu').click(function(){
		$('.sf-menu-mobile').slideDown('slow');;
	});

	$('.close-menu').click(function(){
		$('.sf-menu-mobile').slideUp('slow');
	});

    $(window).scroll(function(){
		if ($('.animated-gif').visible()) {
			$('.animated-gif').gifplayer('play');
		}
    });
});
