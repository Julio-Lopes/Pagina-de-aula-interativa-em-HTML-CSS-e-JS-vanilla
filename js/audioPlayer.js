(function () {
  "use strict";
 
  function fmt(sec) {
    if (!isFinite(sec)) return "0:00";
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
 
  var ICON_PLAY =
    '<svg width="13.75" height="17.5" viewBox="0 0 14 18" fill="currentColor" aria-hidden="true"><path d="M0 1.4v15.2c0 1.1 1.2 1.8 2.2 1.2l11.2-7.6c.8-.5.8-1.9 0-2.4L2.2.2C1.2-.4 0 .2 0 1.4z"/></svg>';
  var ICON_PAUSE =
    '<svg width="13.75" height="17.5" viewBox="0 0 14 18" fill="currentColor" aria-hidden="true"><rect x="1" y="1" width="4" height="16" rx="1"/><rect x="9" y="1" width="4" height="16" rx="1"/></svg>';
 
  function initAudio(root) {
    var audio = root.querySelector("audio");
    var playBtn = root.querySelector("[data-audio-play]");
    var seek = root.querySelector("[data-audio-seek]");
    var time = root.querySelector("[data-audio-time]");
    var vol = root.querySelector("[data-audio-vol]");
    if (!audio || !playBtn || !seek) return;
 
    playBtn.innerHTML = ICON_PLAY;
    playBtn.setAttribute("aria-label", "Reproduzir");
 
    function setProgress() {
      var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      seek.value = pct;
      seek.style.setProperty("--pct", pct + "%");
      if (time) time.textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration);
    }
 
    audio.addEventListener("loadedmetadata", setProgress);
    audio.addEventListener("timeupdate", setProgress);
 
    audio.addEventListener("play", function () {
      playBtn.innerHTML = ICON_PAUSE;
      playBtn.setAttribute("aria-label", "Pausar");
    });
    audio.addEventListener("pause", function () {
      playBtn.innerHTML = ICON_PLAY;
      playBtn.setAttribute("aria-label", "Reproduzir");
    });
    audio.addEventListener("ended", function () {
      audio.currentTime = 0;
    });
 
    playBtn.addEventListener("click", function () {
      if (audio.paused) audio.play();
      else audio.pause();
    });
 
    seek.addEventListener("input", function () {
      if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration;
    });
 
    if (vol) {
      audio.volume = 0.7;
      vol.value = 70;
      vol.style.setProperty("--vol", "70%");
      vol.addEventListener("input", function () {
        audio.volume = vol.value / 100;
        vol.style.setProperty("--vol", vol.value + "%");
      });
    }
 
    setProgress();
  }
 
  window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-audio-root]").forEach(initAudio);
  });
})();