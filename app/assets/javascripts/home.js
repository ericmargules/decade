$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
  	items: 1,
    loop:true,
    margin:10,
    nav:false,
    autoplay:true,
    autoplayTimeout:6000,
  });
	var owl = $('.owl-carousel');
	owl.trigger('play.owl.autoplay',[6000])
});