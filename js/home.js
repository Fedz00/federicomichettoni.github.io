(function () {
  const PreviewPanel = {
    inner: null,
    panel: null,
    hideTimer: null,

    init(panelEl, innerEl) {
      this.panel = panelEl;
      this.inner = innerEl;
    },

    showFromLink(link) {
      if (this.hideTimer) {
        clearTimeout(this.hideTimer);
        this.hideTimer = null;
      }
      const type = link.getAttribute("data-preview-type");
      const src = link.getAttribute("data-preview-src");
      if (!type || !src) return;

      const uri = encodeURI(src);
      this.inner.innerHTML = "";

      let root;
      if (type === "video") {
        const wrap = document.createElement("div");
        wrap.className = "preview-video-crop";
        const vid = document.createElement("video");
        vid.setAttribute("autoplay", "");
        vid.setAttribute("muted", "");
        vid.setAttribute("loop", "");
        vid.setAttribute("playsinline", "");
        vid.setAttribute("webkit-playsinline", "");
        vid.setAttribute("disableremoteplayback", "");
        vid.setAttribute("x-webkit-airplay", "deny");
        vid.disablePictureInPicture = true;
        vid.setAttribute("disablePictureInPicture", "");
        vid.setAttribute("controlsList", "nodownload nofullscreen noremoteplayback");
        vid.controls = false;
        vid.muted = true;
        vid.src = uri;
        vid.play().catch(function () {});
        wrap.appendChild(vid);
        root = wrap;
      } else {
        const img = document.createElement("img");
        img.className = "preview-media";
        img.src = uri;
        img.alt = "";
        root = img;
      }

      this.inner.appendChild(root);
      this.inner.classList.add("is-visible");
      this.panel.setAttribute("aria-hidden", "false");
    },

    hide() {
      const inner = this.inner;
      const panel = this.panel;
      if (!inner.classList.contains("is-visible")) return;

      const vid = inner.querySelector("video");
      if (vid) {
        vid.pause();
      }

      inner.classList.remove("is-visible");
      this.hideTimer = setTimeout(function () {
        inner.innerHTML = "";
        panel.setAttribute("aria-hidden", "true");
        PreviewPanel.hideTimer = null;
      }, 300);
    },
  };

  const Sidebar = {
    init(roleList) {
      const items = roleList.querySelectorAll(".timeline-row");

      items.forEach(function (link) {
        link.addEventListener("mouseenter", function () {
          PreviewPanel.showFromLink(link);
        });
      });

      roleList.addEventListener("mouseleave", function (e) {
        if (!roleList.contains(e.relatedTarget)) {
          PreviewPanel.hide();
        }
      });

      roleList.addEventListener("focusin", function (e) {
        const link = e.target.closest(".timeline-row");
        if (link) PreviewPanel.showFromLink(link);
      });

      roleList.addEventListener("focusout", function () {
        window.requestAnimationFrame(function () {
          if (!roleList.contains(document.activeElement)) {
            PreviewPanel.hide();
          }
        });
      });
    },
  };

  function Layout() {
    const roleList = document.getElementById("roleList");
    const previewPanel = document.getElementById("previewPanel");
    const previewInner = document.getElementById("previewInner");
    if (!roleList || !previewPanel || !previewInner) return;

    PreviewPanel.init(previewPanel, previewInner);
    Sidebar.init(roleList);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", Layout);
  } else {
    Layout();
  }
})();
