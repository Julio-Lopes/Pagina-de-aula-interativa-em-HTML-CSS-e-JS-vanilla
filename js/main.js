(function () {
  "use strict";

  window.addEventListener("DOMContentLoaded", function () {
    var year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
  });
})();