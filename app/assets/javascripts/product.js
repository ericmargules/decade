$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
  	items: 1,
    loop:true,
    margin:10,
    //nav:true,
    autoplay:false,
    URLhashListener:true,
    startPosition: 'URLHash'
    // autoplayTimeout:6000,
  });
	// var owl = $('.owl-carousel');
	// owl.trigger('play.owl.autoplay',[6000])
});