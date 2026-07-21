(function () {
  "use strict";

  var PREFIX = "dot:";

  function available() {
    try {
      var k = "__t";
      sessionStorage.setItem(k, "1");
      sessionStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  }

  var ok = available();

  window.Store = {
    /** Le e desserializa um valor; retorna fallback se ausente ou invalido. */
    get: function (key, fallback) {
      if (!ok) return fallback;
      try {
        var raw = sessionStorage.getItem(PREFIX + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    /** Serializa e grava um valor. */
    set: function (key, value) {
      if (!ok) return;
      try {
        sessionStorage.setItem(PREFIX + key, JSON.stringify(value));
      } catch (e) {
        /* cota cheia ou modo privado: ignora silenciosamente */
      }
    },
    remove: function (key) {
      if (!ok) return;
      try {
        sessionStorage.removeItem(PREFIX + key);
      } catch (e) {}
    }
  };
})();