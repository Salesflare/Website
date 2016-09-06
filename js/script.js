$('document').ready(function(){
	$('.open-menu').click(function(){
		$('.sf-menu-mobile').slideDown('slow');;
	});

	$('.close-menu').click(function(){
		$('.sf-menu-mobile').slideUp('slow');
	});

    $('#myModal').on('show.bs.modal', function (event) {
      var modal = $(this);
      modal.find('img').attr("src", "img/" + campaign + ".png");
    })

	if(campaign === 'investors-tc' || campaign === 'press-tc') {
	   $('#myModal').modal('show');
    };
});

var source = querystring('utm_source');
var campaign = querystring('utm_campaign');

function querystring(key) {
   var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
   var m=re.exec(document.location.search);
   return m[1];
}
