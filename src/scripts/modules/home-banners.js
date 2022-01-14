(function () {
    // reference for main items
    var slider = $("#slider");
    // reference for thumbnail items
    var thumbnailSlider = $("#thumbnailSlider");
    //transition time in ms
    var duration = 250;
  
    // carousel function for main slider
    slider
      .owlCarousel({
        loop: false,
        start: false,
        items: 1,
        margin: 30,
        animateIn: false,
        responsive: {
          600: {
            dots: false,
            nav: true,
          },
          1000: {
            dots: false,
            nav: false,
          },
        },
      })
      .on("changed.owl.carousel", function (e) {
        //On change of main item to trigger thumbnail item
        thumbnailSlider.trigger("to.owl.carousel", [e.item.index, duration, true]);
      });
  
    // carousel function for thumbnail slider
    thumbnailSlider
      .owlCarousel({
        loop: false,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            margin: 0,
            center: true,
            onChanged: function (e) {
              slider.trigger("to.owl.carousel", [e.item.index, duration, true]);
            },
          },
          900: {
            items: 4,
            margin: 0,
          },
        },
      })
      .on("click", ".owl-item", function () {
        // On click of thumbnail items to trigger same main item
        slider.trigger("to.owl.carousel", [$(this).index(), duration, true]);
      });
  
    $(".thumbnail__item").click(function () {
      $(".thumbnail__item").removeClass("active");
    });
  
    $(".thumbnail__item").click(function () {
      $(this).addClass("active");
    });
  })(jQuery);
  