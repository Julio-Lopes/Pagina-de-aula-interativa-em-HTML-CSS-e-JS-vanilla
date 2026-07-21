(function () {
  "use strict";

  function initCard(card) {
    var toggle = card.querySelector("[data-card-toggle]");
    var body = card.querySelector(".icard__text");
    if (!toggle || !body) return;

    // acessibilidade: relaciona o botao ao conteudo
    if (!body.id) body.id = "card-body-" + Math.random().toString(36).slice(2, 8);
    toggle.setAttribute("aria-controls", body.id);
    toggle.setAttribute("aria-expanded", "false");

    function setOpen(open) {
      card.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Fechar" : "Abrir";
      body.setAttribute("aria-hidden", String(!open));
    }

    toggle.addEventListener("click", function () {
      setOpen(!card.classList.contains("is-open"));
    });

    setOpen(false);
  }

  window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-card]").forEach(initCard);
  });
})();