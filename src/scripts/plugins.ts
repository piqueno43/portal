import Breakpoints from "breakpoints-js";
import Cookies from "js-cookie";

import "popper.js";
import "bootstrap";
// initialize breakpoints
Breakpoints();

(function ($) {
  // ToolTips rodape
  $('.rodape [data-toggle="tooltip"], .transparencia [data-toggle="tooltip"], .mapa-acesso-botao').tooltip();

  // popover click body focus
  if (typeof $.fn.popover === "function") {
    $('[data-toggle="popover"]').popover({
      html: true,
      trigger: "focus",
      placement: "bottom",
      container: "body",
    });
  } else {
    var $blocoGestor = $("#gestor-responsavel, .noticia-gestor");

    var $conteudo = $blocoGestor.find("a").data();

    var $blocoNovo = $("<div/>").addClass("gestor-sem-formatacao").appendTo($blocoGestor).hide();
    $blocoNovo.html($conteudo.content);
    $blocoGestor.on("click", "a", function () {
      $(".gestor-sem-formatacao").toggle();
    });
  }
})(jQuery);
// (function () {
//   if (typeof Cookies !== 'function') {
//     console.log('Cookies not found')
//   } else {
//     var logo = $('.menu__logo > img')
//     if(logo){ return;}
//     var $htmlLogo = logo.clone().prop('outerHTML')

//     var $srcLogo = $($htmlLogo).attr('src')
//     var logoMobile = function () {
//       var $src =
//         Cookies.get('contraste') == 'on' ?
//         $srcLogo.replace('.png', '-inverse.png') :
//         $srcLogo.replace('.png', '.png')
//       logo.replaceWith(function () {
//         return $('<img />', {
//           src: $src,
//           alt: this.alt
//         })
//       })
//       return logo.append(this.children)
//     }
//     var logoDesktop = function () {
//       var $src =
//         Cookies.get('contraste') == 'on' ?
//         $srcLogo.replace('.png', '-inverse.png') :
//         $srcLogo.replace('-inverse.png', '.png')
//       logo.replaceWith(function () {
//         return $('<img />', {
//           src: $src,
//           alt: this.alt
//         })
//       })
//       return logo.append(this.children)
//     }
//     $(window).on('bind load resize', function (e) {
//       if (
//         Breakpoints.is('xs') ||
//         Breakpoints.is('md') ||
//         Breakpoints.is('sm')
//       ) {
//         Breakpoints.on('change', logoMobile())
//       } else {
//         Breakpoints.on('change', logoDesktop())
//       }
//     })
//   }
// })(window, document, jQuery)
// abas bs3 to bs4
$(function () {
  var abas = $(".abas-personalizadas, .campaigns__tabs");
  if (abas.length) {
    abas.find(".active").removeClass("active").find("a").addClass("active");
    abas.find("li").addClass("nav-item").find("a").addClass("nav-link");

    abas.on("click", "a", function (e) {
      e.preventDefault();

      $(this).tab("show");
    });
  }
});
// focus on search input menu
(function ($) {
  $(".busca_fechar").on("click", function () {
    $(".menu__dropdown.busca").on("hide.bs.dropdown", function () {
      $(this).removeClass("show");
      setTimeout(function () {
        $("input[name='searchable_text']").val("");
      }, 400);
    });
  });
  $(".busca_botao").on("click", function () {
    $(".menu__dropdown.busca").on("show.bs.dropdown", function () {
      setTimeout(function () {
        $("input[name='searchable_text']").focus();
      }, 400);
    });
  });
})(jQuery);
// checar o campo se é numero ou nome para aparecer o campo de data de nascimento
$(".campo-data-situacao-eleitoral").hide();
$("#SE_NomeTituloEleitor").on("keyup blur", function () {
  var valor_campo = $(this).val();
  var regra = /^[0-9]+$/;

  if (valor_campo != "") {
    if (valor_campo.match(regra)) {
      $(".campo-data-situacao-eleitoral").hide();
    } else {
      $(".campo-data-situacao-eleitoral").show();
    }
  } else {
    $(".campo-data-situacao-eleitoral").hide();
  }
});

$(function () {
  var menuPrincipal = $("nav.menu.navbar");
  var busca = menuPrincipal.find(".busca");
  var botaoMobile = menuPrincipal.find(".navbar-toggler");
  // you can do in a chain
  Breakpoints.get("xs").on({
    enter: function () {
      busca.addClass("mobile-search").removeClass("no-mobile-search").insertAfter(botaoMobile);
      $(".no-mobile-search").detach();
    },
    leave: function () {
      var menu = menuPrincipal.find(".navbar-nav > li:last-child");
      busca.removeClass("mobile-search").addClass("no-mobile-search").insertAfter(menu);
      $(".mobile-search").detach();
    },
  });
});

(function ($) {
  var mapaSearch = $("#mapa-search");
  var mapa = $(".mapa-acesso-botao");
  var aviso = $(".aviso");
  var mapaAcessoBotao = $(".mapa-acesso-botao");
  var mapaPesquisaForm = $(".mapa-pesquisa-form");
  var mapaPesquisaClose = $(".mapa-pesquisa-close");
  var mapaCollapse = $("#collapseMapaSite");
  var card = $("#mapa-links .mapa__lista-grupo .mapa__lista-item");
  var mapaItens = $(".mapa__card-header, .mapa__lista-item");

  if (aviso.length) {
    mapaAcessoBotao.removeClass("btn-outline-amarelo").addClass("btn-outline-azul");
  }

  mapa.click(function (e) {
    mapaCollapse.collapse("toggle");

    $("html, body").animate(
      {
        scrollTop: $(document).height() - 120,
      },
      500
    );
    e.preventDefault();
    mapaCollapse.on("hidden.bs.collapse", function () {
      mapaItens.show();
      mapaSearch.val("");
    });
  });

  mapaCollapse.on("show.bs.collapse", function () {
    aviso.hide("fast");

    mapaPesquisaClose.find(".fa").removeClass("fa-sitemap").addClass("fa-close");

    mapaAcessoBotao.removeClass("btn-outline-amarelo").addClass("btn-outline-azul");
    mapaPesquisaClose.removeClass("fechado").addClass("aberto");

    mapaPesquisaForm.removeClass("fechado").addClass("aberto");
    mapaSearch.focus();
  });

  mapaCollapse.on("hide.bs.collapse", function () {
    aviso.show();
    mapaPesquisaClose.find(".fa").removeClass("fa-close").addClass("fa-sitemap");
    if (aviso.length) {
      mapaAcessoBotao.removeClass("btn-outline-amarelo").addClass("btn-outline-azul");
    } else {
      mapaAcessoBotao.removeClass("btn-outline-azul").addClass("btn-outline-amarelo");
    }

    mapaPesquisaClose.removeClass("aberto").addClass("fechado");
    mapaPesquisaForm.removeClass("aberto").addClass("fechado");
    mapaSearch.val("");
  });
})(jQuery);

(function ($) {
  $('[accesskey="3"]').on("keyup", function () {
    $(".dropdown-menu.sub-menu ").addClass("show").find("#buscaPortal").focus();
  });
  $(".busca_fechar").on("click", function () {
    $(".dropdown-menu.sub-menu ").removeClass("show");
  });

  // verifica se tem selos
  if (!$(".rodape__selos").length) {
    $(".rodape__links").addClass("sem-selos");
  }

  // alterar icone do mapa no hover do mouse

  $('[data-target="#mapaModal"] > .endereco__media__img')
    .mouseover(function () {
      var $self = $(this);

      var $replaced = $self.attr("src").replace(".png", "-hover.png");
      $self.attr("src", $replaced);
    })
    .mouseleave(function () {
      var $self = $(this);

      var $replaced = $self.attr("src").replace("-hover.png", ".png");
      $self.attr("src", $replaced);
    });

  //Cookies - Política de privacidade

  //Verificar se o usuário já concordou com os termos

  function verificar_resposta(nome_cookie) {
    var resposta = Cookies.get(nome_cookie);

    if (resposta == "concordo") {
      $(".cookies").addClass("sr-only");
    }

    // console.log(resposta);
  }

  verificar_resposta("politica-de-privacidade");

  //Abrir e fechar dúvida
  $(".cookies .duvida").on("click", function () {
    $(this).find(".texto-duvida").toggleClass("sr-only");
  });

  //Gravar cookie e descer box
  $(".cookies .botao button").on("click", function () {
    $(this).closest(".cookies").addClass("fechar-box-cookies");
    Cookies.set("politica-de-privacidade", "concordo", { expires: 30 });
  });
})(jQuery);
