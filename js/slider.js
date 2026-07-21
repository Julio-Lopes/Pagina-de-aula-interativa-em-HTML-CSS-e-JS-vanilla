(function () {
  "use strict";

  function initSlider(root) {
    var track = root.querySelector(".slider__track");
    var slides = Array.prototype.slice.call(root.querySelectorAll(".slider__slide"));
    var prev = root.querySelector('[data-slider="prev"]');
    var next = root.querySelector('[data-slider="next"]');
    var dotsWrap = root.querySelector(".slider__dots");
    if (!track || slides.length === 0) return;

    var index = 0;
    var dots = [];

    // cria os dots dinamicamente conforme o numero de slides
    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider__dot";
      dot.setAttribute("aria-label", "Ir para o slide " + (i + 1));
      dot.addEventListener("click", function () {
        go(i);
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function update() {
      track.style.transform = "translateX(" + -index * 100 + "%)";
      slides.forEach(function (s, i) {
        s.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
      dots.forEach(function (d, i) {
        d.setAttribute("aria-current", i === index ? "true" : "false");
      });
      // estado disabled nas pontas
      prev.disabled = index === 0;
      next.disabled = index === slides.length - 1;
    }

    function go(i) {
      index = Math.max(0, Math.min(slides.length - 1, i));
      update();
    }

    prev.addEventListener("click", function () { go(index - 1); });
    next.addEventListener("click", function () { go(index + 1); });

    // navegacao por teclado quando o slider tem foco
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { go(index - 1); }
      else if (e.key === "ArrowRight") { go(index + 1); }
    });

    update();
  }

  window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-slider-root]").forEach(initSlider);
  });
})();