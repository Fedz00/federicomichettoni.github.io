(function () {
  const SECTIONS = [
    {
      id: "2024-present",
      label: "2024–Present",
      projects: [
        {
          title: "Cumulus9",
          meta: "AI-driven visual content · derivatives & margin analytics",
          paragraphs: [
            "At Cumulus9, I lead the development of AI-driven visual content for a derivatives margin analytics platform, defining concept, positioning and execution.",
            "I create short-form visual pieces designed to compare modern margin analytics workflows with legacy methods, highlighting ease of use, transparency and key product features — so the platform’s value is immediately understandable without relying on technical detail.",
            "As a one-person creative function, I manage the full process from strategic concept and narrative framing to AI generation, motion development and final edit for digital distribution. AI is used as a structured production tool for clarity, usability, efficiency and brand coherence.",
          ],
          tools: [
            "ChatGPT",
            "Kling AI",
            "Claude",
            "Photoshop",
            "After Effects",
          ],
        },
      ],
    },
    {
      id: "2024",
      label: "2024",
      projects: [
        {
          title: "UK Pavilion · Expo Osaka 2025",
          meta: "Immersive International",
          paragraphs: [
            "For the UK Pavilion at Expo Osaka 2025, I contributed to a modular visual system for themes of construction, collaboration and technological progress.",
            "With the Art Director, I helped shape a narrative in which characters, environments and the pavilion’s mascot evolve from simple pixel-based forms into more complex voxel structures — mirroring building and refinement.",
            "AI-assisted tools sat inside a controlled workflow for world-building, character continuity and scalable production across large immersive environments.",
          ],
          tools: [
            "Midjourney",
            "Stable Diffusion",
            "ControlNet",
            "Illustrator",
            "Photoshop",
            "DALL·E",
            "Custom GPT",
            "LoRA training",
            "Magnific AI",
          ],
        },
      ],
    },
    {
      id: "2023",
      label: "2023",
      projects: [
        {
          title: "Inneraum",
          meta: "Berlin-based fashion brand · campaign",
          paragraphs: [
            "Brand campaign integrating AI-generated models with real product photography around a single, consistent virtual persona across multiple images.",
            "Real accessories were shot and placed on AI-generated figures with attention to proportion, lighting coherence, material realism and identity stability.",
            "The AI character was treated as a structured narrative element across the campaign — generative tools used with disciplined direction for brand coherence.",
          ],
          tools: [
            "Studio photography",
            "Stable Diffusion",
            "ControlNet",
            "ReActor",
            "Photoshop",
          ],
        },
      ],
    },
    {
      id: "studio",
      label: "Studio",
      projects: [
        {
          title: "AI-enhanced mannequin photography",
          meta: "Fashion imagery · research",
          paragraphs: [
            "Exploring generative AI as a controlled tool between traditional product photography and campaign-ready visuals — starting from real garments on mannequins.",
            "Iterative work on introducing AI-generated figures while preserving proportions, fabric behaviour and material detail, balancing realism, consistency and flexibility.",
            "Photography, compositing and generative tools combined for authorship and coherence rather than automation as a shortcut.",
          ],
          tools: ["Photography", "Photoshop", "OpenAI", "Magnific AI"],
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

    section.projects.forEach((p) => {
      const block = document.createElement("article");
      block.className = "project";

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

      p.paragraphs.forEach((text) => {
        const para = document.createElement("p");
        para.className = "project-body";
        para.textContent = text;
        block.appendChild(para);
      });

      if (p.tools && p.tools.length) {
        const ul = document.createElement("ul");
        ul.className = "tools";
        p.tools.forEach((t) => {
          const li = document.createElement("li");
          li.textContent = t;
          ul.appendChild(li);
        });
        block.appendChild(ul);
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
