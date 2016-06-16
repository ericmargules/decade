$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
  	items: 1,
    loop:true,
    margin:10,
    autoplay:false,
    URLhashListener:true,
    startPosition: 'URLHash'
  });
});