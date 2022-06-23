/*-----------------------------------------------------------
 * Template Name    : Liam - Creative Personal Portfolio
 * Author           : gtomdesign
 * Version          : 1.0
 * Created          : April 2020
 * File Description : Main Js file of the template
 *------------------------------------------------------------
 */

!(function ($) {
  "use strict";
  AOS.init({});
  $("#autoplay").textition({
    speed: 1.5,
    animation: "ease-out",
    map: { x: 200, y: 100, z: 0 },
    autoplay: true,
    interval: 3,
  });
  $(document).on("click", "a.page-scroll", function (event) {
    var $anchor = $(this);
    $("a.page-scroll").removeClass("current-menu-item");
    $(this).addClass("current-menu-item");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top - 140,
        },
        1250,
        "easeInOutExpo"
      );
    event.preventDefault();
  });
  $(document).on("scroll", onScroll);
  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $("a.page-scroll").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (
        refElement.position().top <= scrollPos + 190 &&
        refElement.position().top + refElement.height() > scrollPos + 190
      ) {
        $("a.page-scroll").removeClass("current-menu-item");
        currLink.addClass("current-menu-item");
      } else {
        currLink.removeClass("current-menu-item");
      }
    });
  }

  var $grid = $(".grid");
  $grid.imagesLoaded(function () {
    $grid.isotope({ itemSelector: ".grid-item", layoutMode: "masonry" });
  });
  var $portfolioCats = $(".portfolio-cats a");
  $portfolioCats.on("click", function (a) {
    a.preventDefault();
    var b = $(this).data("cat");
    "*" !== b && (b = "." + b), $grid.isotope({ filter: b });
  });
  var $portfolioItems = $("#portfolio .grid-item"),
    $portfolioModal = $(".portfolio-modal"),
    $portfolioModalNavPrev = $(".portfolio-modal .modal-nav-prev"),
    $portfolioModalNavNext = $(".portfolio-modal .modal-nav-next"),
    $portfolioModalNavClose = $(".portfolio-modal .modal-nav-close"),
    $portfolioOverlay = $(".portfolio-overlay"),
    $portfolioOpenModal = $(".portfolio-open-modal");
  $portfolioModalNavPrev.on("click", function (a) {
    a.preventDefault(),
      $portfolioItems.filter(".current").prev().trigger("click");
  }),
    $portfolioModalNavNext.on("click", function (a) {
      a.preventDefault(),
        $portfolioItems.filter(".current").next().trigger("click");
    }),
    $portfolioModalNavClose.on("click", function (a) {
      a.preventDefault(), $portfolioOverlay.trigger("click");
    }),
    $portfolioOpenModal.on("click", function (a) {
      a.preventDefault(), $(this).parents(".grid-item").trigger("click");
    }),
    $portfolioItems.on("click", function (a) {
      if (
        "img" === a.target.tagName.toLowerCase() ||
        $(a.target).hasClass("grid-item")
      ) {
        var b = $(this),
          c = b.find(".portfolio-info"),
          d = $portfolioModal.find(".left"),
          e = $portfolioModal.find(".right"),
          f = b.find("ul.image-list"),
          g = b.find("ul.video");
        if (
          (b.addClass("current").siblings().removeClass("current"),
          $portfolioModalNavPrev
            .parent()
            .toggleClass("enabled", b.prev().length > 0),
          $portfolioModalNavNext
            .parent()
            .toggleClass("enabled", b.next().length > 0),
          d.empty().append(c.clone()),
          e.empty(),
          f.length > 0)
        ) {
          var h = $("<div />").addClass("owl-carousel owl-theme");
          f.find("img").each(function (a, b) {
            var c = $(b).clone();
            c.attr("src", c.data("src")),
              c.hasClass("img-vertical") &&
                c.css("max-height", $win.innerHeight() - 240),
              $("<div />").addClass("item").append(c).appendTo(h);
          }),
            e.append(h),
            h.imagesLoaded(function () {
              h.owlCarousel({
                loop: !0,
                margin: 0,
                nav: !1,
                items: 1,
                autoHeight: !0,
                dots: !0,
              }),
                openPortfolioModal();
            });
        }
        if (g.length > 0) {
          var i = g.find("iframe"),
            j = i.data("src"),
            k = $("<div />").addClass("wide-screen");
          if (-1 !== j.indexOf("youtube")) {
            var l = j.split("?"),
              m = null;
            if (l.length > 0) {
              (m = l[0]), (srcPure = m.split("/")), (srcPure = srcPure.pop());
              var n = $("<a />")
                .attr({ href: "#" })
                .append(
                  $("<img/>").attr({
                    src:
                      "http://i.ytimg.com/vi/" + srcPure + "/maxresdefault.jpg",
                  })
                );
              k.append(n),
                k.imagesLoaded(function () {
                  e.append(k), openPortfolioModal();
                }),
                n.on("click", function (a) {
                  a.preventDefault(),
                    (j += "&autoplay=1"),
                    k.empty().append(i.clone().attr({ src: j }));
                });
            }
          } else
            k.append(
              i
                .clone()
                .attr({ src: j })
                .on("load", function () {
                  openPortfolioModal();
                })
            ),
              e.append(k);
        }
        $portfolioOverlay.css("display", "flex"),
          setTimeout(function () {
            $portfolioOverlay.addClass("opened");
          }, 100);
      }
    }),
    $portfolioOverlay.on("click", function (a) {
      $(a.target).hasClass("portfolio-overlay") &&
        ($portfolioModal.find(".right").empty(),
        $portfolioModal.removeClass("opened"),
        setTimeout(function () {
          $portfolioOverlay.removeClass("opened"),
            setTimeout(function () {
              $portfolioOverlay.hide(), $portfolioOverlay.removeClass("loaded");
            }, 300);
        }, 300));
    });
  function openPortfolioModal() {
    setTimeout(function () {
      $portfolioModal.addClass("opened"), $portfolioOverlay.addClass("loaded");
    }, 300);
  }
  $(document).on("click", "a.select-cat", function (event) {
    var $anchor = $(this);
    $("a.select-cat").removeClass("current");
    $(this).addClass("current");
    event.preventDefault();
  });
})(window.jQuery);
