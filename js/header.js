$(document).ready(function() {

  $('.one').on('click', function() {

    //this scroll withour animations in chrome
    $('p').get(0).scrollIntoView({
      block: "start",
      behavior: "smooth"
    });

  });

  //this scroll WITH animations in all browsers 
  
  //taken from: http://praveenlobo.com/techblog/how-to-scroll-elements-smoothly-in-javascript-jquery-without-plugins/
  
  function scrollToElement(element, parent) {
    $(parent)[0].scrollIntoView(true);
    $(parent).animate({
      scrollTop: $(parent).scrollTop() + $(element).offset().top - $(parent).offset().top
    }, {
      duration: 'slow',
      easing: 'swing'
    });
  }

  //call animated scroll script on click of 2nd button
  $('.two').on('click', function() {
    var paretq = $('#div-holder-id');
    var elemq = $('#h6-end');
    scrollToElement(elemq, paretq);
  })
})