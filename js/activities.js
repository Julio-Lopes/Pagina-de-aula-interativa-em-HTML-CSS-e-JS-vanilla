(function () {
  "use strict";
 
  /* -------------------- Atividade discursiva -------------------- */
  function initDiscursive(root) {
    var textarea = root.querySelector("[data-field]");
    var btnResponder = root.querySelector('[data-action="responder"]');
    var btnAlterar = root.querySelector('[data-action="alterar"]');
    var feedback = root.querySelector('[data-feedback="success"]');
    var KEY = "discursive";
 
    // aplica um estado completo na UI
    function render(state) {
      textarea.value = state.text || "";
      textarea.disabled = state.answered;
      var hasText = textarea.value.trim().length > 0;
 
      if (state.answered) {
        btnResponder.disabled = true;
        btnAlterar.disabled = false;
        feedback.classList.add("is-visible");
      } else {
        btnResponder.disabled = !hasText;
        btnAlterar.disabled = true;
        feedback.classList.remove("is-visible");
      }
    }
 
    function save(state) {
      Store.set(KEY, state);
    }
 
    var state = Store.get(KEY, { text: "", answered: false });
    render(state);
 
    textarea.addEventListener("input", function () {
      if (state.answered) return;
      state.text = textarea.value;
      btnResponder.disabled = textarea.value.trim().length === 0;
      save(state);
    });
 
    btnResponder.addEventListener("click", function () {
      if (textarea.value.trim().length === 0) return;
      state.answered = true;
      state.text = textarea.value;
      render(state);
      save(state);
    });
 
    btnAlterar.addEventListener("click", function () {
      state.answered = false;
      render(state);
      save(state);
      textarea.focus();
    });
  }
 
  /* -------------------- Atividade objetiva -------------------- */
  function initObjective(root) {
    var CORRECT = root.getAttribute("data-correct") || "b";
    var optionsWrap = root.querySelector(".options");
    var options = Array.prototype.slice.call(root.querySelectorAll(".option"));
    var inputs = Array.prototype.slice.call(root.querySelectorAll(".option input"));
    var btnResponder = root.querySelector('[data-action="responder"]');
    var btnAlterar = root.querySelector('[data-action="alterar"]');
    var fbSuccess = root.querySelector('[data-feedback="success"]');
    var fbRetry = root.querySelector('[data-feedback="retry"]');
    var KEY = "objective";
 
    function selectedValue() {
      var checked = inputs.filter(function (i) { return i.checked; })[0];
      return checked ? checked.value : null;
    }
 
    function paintSelection() {
      options.forEach(function (opt) {
        var input = opt.querySelector("input");
        opt.classList.toggle("is-selected", input.checked);
      });
    }
 
    function render(state) {
      // restaura selecao
      inputs.forEach(function (i) { i.checked = i.value === state.value; });
      paintSelection();
 
      fbSuccess.classList.remove("is-visible");
      fbRetry.classList.remove("is-visible");
 
      if (state.answered) {
        optionsWrap.classList.add("is-locked");
        inputs.forEach(function (i) { i.disabled = true; });
        btnResponder.disabled = true;
        btnAlterar.disabled = false;
        if (state.value === CORRECT) fbSuccess.classList.add("is-visible");
        else fbRetry.classList.add("is-visible");
      } else {
        optionsWrap.classList.remove("is-locked");
        inputs.forEach(function (i) { i.disabled = false; });
        btnResponder.disabled = !state.value;
        btnAlterar.disabled = true;
      }
    }
 
    function save(state) { Store.set(KEY, state); }
 
    var state = Store.get(KEY, { value: null, answered: false });
    render(state);
 
    inputs.forEach(function (input) {
      input.addEventListener("change", function () {
        if (state.answered) return;
        // comporta como escolha unica: desmarca as demais
        inputs.forEach(function (i) { i.checked = i === input; });
        state.value = input.value;
        paintSelection();
        btnResponder.disabled = false;
        save(state);
      });
    });
 
    btnResponder.addEventListener("click", function () {
      if (!state.value) return;
      state.answered = true;
      render(state);
      save(state);
    });
 
    btnAlterar.addEventListener("click", function () {
      state.answered = false;
      render(state);
      save(state);
    });
  }
 
  window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[data-activity="discursive"]').forEach(initDiscursive);
    document.querySelectorAll('[data-activity="objective"]').forEach(initObjective);
  });
})();