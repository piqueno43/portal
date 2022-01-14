$(document).ready(function() {
  $("#seu-feedback .tab-content .tab-pane").keyup(function() {
      var posicao_textarea = $(this).index();
      var verificar_texto = $(this).find("textarea").val();
      if (verificar_texto !== "") {
          $("#seu-feedback ul.nav li").find("a").eq(posicao_textarea).addClass("textarea-preenchido");
      } else {
          $("#seu-feedback ul.nav li").find("a").eq(posicao_textarea).removeClass("textarea-preenchido");
      }
  });
});