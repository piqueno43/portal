import  tooltip  from 'bootstrap/js/dist/tooltip';

$(document).ready(function () {

  var body = $("body");

  //SUBIR E DESCER PÁGINA

  $('.navegacao__setas span').tooltip({
      template: '<div class="tooltip tooltip__setas" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      delay: {
          "show": 50,
          "hide": 0
      }
  });

  var tag_scroll_top = $("html, body");

  var navegacaoHome = {
      "navegacao_1": ["navegacao_1", "body"],
      "navegacao_2": ["navegacao_2", ".servicos"],
      "navegacao_3": ["navegacao_3", ".veiculos-redes"],
      "navegacao_4": ["navegacao_4", ".banners"],
      "navegacao_5": ["navegacao_5", ".rodape"]
  };

  body.addClass(navegacaoHome.navegacao_1[0]);
  $(navegacaoHome.navegacao_2[1]).addClass(navegacaoHome.navegacao_2[0]);
  $(navegacaoHome.navegacao_3[1]).addClass(navegacaoHome.navegacao_3[0]);
  $(navegacaoHome.navegacao_4[1]).addClass(navegacaoHome.navegacao_4[0]);
  $(navegacaoHome.navegacao_5[1]).addClass(navegacaoHome.navegacao_5[0]);
  //função que coloca a class .tag-navegacao-atual na primeira tag mapeada
  function add_class_navegacao_inicio() {
      $(navegacaoHome.navegacao_1[1]).addClass("tag-navegacao-atual");
  }
  //função que remove a class .tag-navegacao-atual de todas as tags mapeadas
  function remover_class_navegacao() {
      $.each(navegacaoHome, function (index, value) {
          $(value[1]).removeClass("tag-navegacao-atual");
      });
  }
  //função que faz o scroll
  function scroll(altura_scroll) {
      tag_scroll_top.animate({
          scrollTop: altura_scroll
      }, 500);
  }

  add_class_navegacao_inicio();

  $(".navegacao__setas span").on("click", function (e) {

      //pega url da página
      var url = window.location.href;
      //verifica se tem subpasta
      var nivel_url = url.match(/\w+\/+[\w].+/gmi);
      //pegar class que foi clicada
      var class_navegacao = $(this).attr("class");

      //se a class foi "descer" ele executa aqui
      if (class_navegacao == "navegacao__setas_descer") {

          //se não tiver subpasta ele executa aqui
          if (!nivel_url) {

              //pega todas as class onde a class .tag-navegacao-atual se encontra
              var procurar_navegacao = $(".tag-navegacao-atual").attr("class");
              //pega a class da navegacao atual
              var res = procurar_navegacao.match(/navegacao_[0-9]+/gmi);
              //pega o número da navegação atual
              res = (res + "").split("_")[1];
              res = parseInt(res);
              //limita até onde vai a navegação
              var max = 5;
              //diminui um pouco a altura de onde parar o scroll
              var diferenca_altura = 20;
              //dar o número da navegação da próxima parada do scroll 
              var proxima_navegacao = res + 1;

              if (proxima_navegacao <= max) {
                  remover_class_navegacao();
                  $(".navegacao_" + proxima_navegacao).addClass("tag-navegacao-atual");
                  var altura = $(".navegacao_" + proxima_navegacao).offset().top;
                  scroll(altura - diferenca_altura);
              }
          }
          //se tiver subpasta ele executa aqui
          else if (nivel_url) {
              //Altura da página
              var altura_pagina = $(document).height();
              //Altura atual
              var scroll_atual = $(window).scrollTop();
              //Quantos px o scroll vai descer
              var descer_scroll = 500;
              //Onde o scroll se encontra a cada click para descer
              scroll_atual = scroll_atual + descer_scroll;

              if (scroll_atual <= altura_pagina) {
                  scroll(scroll_atual);
              }
          }
      }
      //se a class foi "subir" ele executa aqui
      else if (class_navegacao == "navegacao__setas_subir") {
          scroll(0);
          if (!nivel_url) {
              remover_class_navegacao();
              add_class_navegacao_inicio();
          }
      }
  });

  $(window).on("scroll", function () {
      var scroll_atual = $(window).scrollTop();
      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop();

      if (scroll_atual == 0) {
          $(".navegacao__setas_subir").addClass("sumir-seta");
          $(".navegacao__setas").addClass("display-before");
      } else {
          $(".navegacao__setas_subir").removeClass("sumir-seta");
          $(".navegacao__setas").removeClass("display-before");
      }

      if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
          $(".navegacao__setas_descer").addClass("sumir-seta");
          $(".navegacao__setas").addClass("display-before");
      } else {
          $(".navegacao__setas_descer").removeClass("sumir-seta");
      }

  });

  //ACESSIBILIDADE

  $('.ferramentas li').tooltip({
      template: '<div class="tooltip tooltip__acessibilidade" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  });

  $(".ferramentas").on("click", ".ferramentas__botao_abrir", function () {
      $(".ferramentas .ferramentas__botoes").toggleClass("desativado");
  });

  //Link botão acessibilidade

  var url_acessibilidade = $(".transparencia_link[data-original-title='Acessibilidade']").attr("href");
  
  $(".ferramentas__botoes_acessibilidade").on("click", function () {
      if (url_acessibilidade != undefined && url_acessibilidade != "") {
          window.location = url_acessibilidade;
      } else {
          window.location = "http://www.tse.jus.br/acessibilidades-tse";
      }
  });
});