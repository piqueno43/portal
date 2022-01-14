(function ($) {
  var total = 0;
  if ($(".card-twitter .card-text").length > 0) {
    $(".card-twitter .card-text").each(function () {
      total += $(this).text().length;
    });
  } else {
    total = 420;
  }
  var maxLength = total; // How many characters are shown by default
  var ellipsestext = "...";
  var moretext = '<i class="fa fa-long-arrow-down" aria-hidden="true"></i> &nbsp; leia mais';
  var lesstext = '<i class="fa fa-long-arrow-up" aria-hidden="true"></i> &nbsp;  ocultar';
  $(".card-instagram .more, .card-youtube .more, .card-facebook .more").each(function () {
    var tipoRede = $(this)
      .closest(".card")
      .attr("class")
      .replace(/card|-/gm, "")
      .trim();
    var content = $(this).text();

    if (content.length > maxLength) {
      var c = content.substr(0, maxLength);
      var h = content.substr(maxLength, content.length - maxLength);

      var html =
        c + '<span class="moreellipses">' + ellipsestext + "&nbsp;</span>" + '<span class="mais-conteudo"><span>' + h + "</span>&nbsp;&nbsp;" + '<button class="leia-mais btn btn-sm btn-' + tipoRede + '">' + moretext + "</button></span>";
      $(this).html(html);
    }
  });

  $(".leia-mais").click(function (e) {
    if ($(this).hasClass("less")) {
      $(this).removeClass("less");
      $(this).html(moretext);
    } else {
      $(this).addClass("less");
      $(this).html(lesstext);
    }
    $(this).parent().prev().toggle();
    $(this).prev().toggle();
    e.preventDefault();
  });
})(jQuery);
