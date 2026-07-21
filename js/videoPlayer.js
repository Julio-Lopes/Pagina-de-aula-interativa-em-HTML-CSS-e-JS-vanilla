(function () {
  "use strict";

  function initVideo(root) {
    var overlay = root.querySelector(".video__overlay");
    var id = root.getAttribute("data-youtube");
    if (!overlay || !id) return;

    overlay.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" +
        id +
        "?autoplay=1&rel=0";
      iframe.title = "Player de video";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      root.appendChild(iframe);
      overlay.remove();
      var poster = root.querySelector(".video__poster");
      if (poster) poster.remove();
    });
  }

  window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-video-root]").forEach(initVideo);
  });
})();