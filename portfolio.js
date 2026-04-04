(function () {
  const SECTIONS = [
    {
      id: "2024-present",
      label: "2024–Present",
      projects: [
        {
          logo: {
            src: "images/CUMULUS9.png",
            alt: "Cumulus9",
          },
          title: "Cumulus9",
          meta: "Derivatives margin analytics",
          paragraphs: [
            "Short-form visual content for a margin analytics platform.",
            "Concept through motion and delivery for digital distribution.",
          ],
          video: "images/cumulus9-reel.mp4",
        },
      ],
    },
    {
      id: "2024",
      label: "2024",
      logo: {
        src: "images/IMMERSIVE.png",
        alt: "Immersive International",
      },
      projects: [
        {
          title: "UK Pavilion · Expo Osaka 2025",
          meta: "Immersive International",
          paragraphs: [
            "Translated conceptual direction into production-ready visuals for large-scale environments.",
            "Art direction across characters and environments.",
          ],
          video: "images/osaka 2025.mp4",
        },
      ],
    },
    {
      id: "studio",
      label: "Studio",
      projects: [
        {
          title: "AI-enhanced mannequin photography",
          meta: "Fashion imagery",
          paragraphs: [
            "Garments on mannequins extended with generated figures.",
            "Proportion and fabric retained through compositing.",
          ],
          video: "images/studio-mannequin-reel.mp4",
        },
      ],
    },
  ];

  const navEl = document.getElementById("yearNav");
  const panelEl = document.getElementById("projectsPanel");
  if (!navEl || !panelEl) return;

  function renderProjects(section) {
    panelEl.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "panel-fade";
    wrap.setAttribute("role", "region");
    wrap.setAttribute("aria-label", `Work · ${section.label}`);

    if (section.logo) {
      const logoWrap = document.createElement("div");
      logoWrap.className = "section-logo";
      const img = document.createElement("img");
      img.src = encodeURI(section.logo.src);
      img.alt = section.logo.alt;
      img.loading = "lazy";
      logoWrap.appendChild(img);
      wrap.appendChild(logoWrap);
    }

    section.projects.forEach((p) => {
      const block = document.createElement("article");
      block.className = "project";

      if (p.logo) {
        const logoWrap = document.createElement("div");
        logoWrap.className = "project-logo";
        const img = document.createElement("img");
        img.src = encodeURI(p.logo.src);
        img.alt = p.logo.alt;
        img.loading = "lazy";
        logoWrap.appendChild(img);
        block.appendChild(logoWrap);
      }

      const h = document.createElement("h2");
      h.className = "project-title";
      h.textContent = p.title;
      block.appendChild(h);

      if (p.meta) {
        const m = document.createElement("p");
        m.className = "project-meta";
        m.textContent = p.meta;
        block.appendChild(m);
      }

      (p.paragraphs || []).forEach((text) => {
        const para = document.createElement("p");
        para.className = "project-body";
        para.textContent = text;
        block.appendChild(para);
      });

      if (p.video) {
        const vid = document.createElement("video");
        vid.className = "project-video";
        vid.setAttribute("controls", "");
        vid.setAttribute("playsinline", "");
        vid.preload = "metadata";
        const source = document.createElement("source");
        source.src = encodeURI(p.video);
        source.type = "video/mp4";
        vid.appendChild(source);
        block.appendChild(vid);
      }

      wrap.appendChild(block);
    });

    panelEl.appendChild(wrap);
  }

  function selectSection(id) {
    const section = SECTIONS.find((s) => s.id === id);
    if (!section) return;

    navEl.querySelectorAll(".year-btn").forEach((btn) => {
      const sel = btn.dataset.sectionId === id;
      btn.setAttribute("aria-selected", sel ? "true" : "false");
    });

    renderProjects(section);
    try {
      history.replaceState(null, "", `#${id}`);
    } catch (_) {
      /* ignore */
    }
  }

  SECTIONS.forEach((s, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "year-btn";
    btn.textContent = s.label;
    btn.dataset.sectionId = s.id;
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
    btn.addEventListener("click", () => selectSection(s.id));
    navEl.appendChild(btn);
  });

  const hash = (location.hash || "").replace(/^#/, "");
  const initial = SECTIONS.some((s) => s.id === hash) ? hash : SECTIONS[0].id;
  selectSection(initial);

  window.addEventListener("hashchange", () => {
    const h = (location.hash || "").replace(/^#/, "");
    if (SECTIONS.some((s) => s.id === h)) selectSection(h);
  });
})();
