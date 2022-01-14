(function ($) {
  $("#full-cards-owl-carousel").owlCarousel({
    loop: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      540: {
        items: 1,
        nav: true,
      },
      720: {
        items: 3,
        nav: false,
      },
      960: {
        items: 3,
        nav: false,
      },
      1140: {
        items: 4,
        nav: false,
        loop: false,
      },
    },
  });
})(jQuery);
