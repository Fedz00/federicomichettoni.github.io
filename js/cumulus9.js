(function () {
  const posts = [
    {
      title: "#FIAExpo Chicago — conference recap",
      date: "Nov 2025",
      type: "Event · Video",
      mediaType: "video",
      mediaSrc: "../images/fia-expo-2025-web.mp4?v=2",
      impressions: 2499,
      clicks: 699,
      ctr: "27.97%",
      about:
        "Conference recap from FIA Expo 2025 in Chicago. The highest-performing post of the year — 699 clicks driven by authentic conference energy and recognisable faces from the derivatives community.",
    },
    {
      title: "Next wave of features — stress testing",
      date: "Sep 2025",
      type: "Product · Image",
      mediaType: "image",
      mediaSrc: "../images/CUMULUS9.png",
      impressions: 2904,
      clicks: 383,
      ctr: "13.19%",
      about:
        "Product roadmap teaser for upcoming stress testing and analytics upgrades. Specific feature names drive curiosity — vague \"coming soon\" posts don't. 383 clicks from a specialist audience.",
    },
    {
      title: "AI Risk Assistant launch",
      date: "Jan 2026",
      type: "Product · Image",
      mediaType: "image",
      mediaSrc: "../images/CUMULUS9.png",
      impressions: 821,
      clicks: 111,
      ctr: "13.52%",
      about:
        "Introduced the AI Risk Assistant — natural-language explanations of portfolio risk drivers. The framing focused on a specific workflow pain: risk managers spending hours interpreting reports. 13.52% CTR shows strong buyer intent from a specialist audience.",
    },
    {
      title: "FOW Asia Pacific Award",
      date: "Sep 2025",
      type: "Award · Image",
      mediaType: "image",
      mediaSrc: "../images/CUMULUS9.png",
      impressions: 1626,
      clicks: 190,
      ctr: "11.69%",
      about:
        "Risk Management Solution of the Year announcement at the FOW Asia Pacific Awards 2025. Award posts generate credibility signals and shares — the community congratulates, the algorithm amplifies.",
    },
    {
      title: "FIA Expo recap video",
      date: "Dec 2025",
      type: "Event · Video",
      mediaType: "video",
      mediaSrc: "../images/cumulus9-video.mp4?v=5",
      impressions: 1895,
      clicks: 180,
      ctr: "9.5%",
      about:
        "750 video views. A longer recap extending the event's reach to the thousands who couldn't attend Chicago in person. Video format keeps people engaged longer than static posts.",
    },
    {
      title: "Credit Risk Innovation of the Year",
      date: "Jun 2025",
      type: "Award · Video",
      mediaType: "video",
      mediaSrc: "../images/cumulus9-video.mp4?v=5",
      impressions: 2185,
      clicks: 144,
      ctr: "6.59%",
      about:
        "828 video views. Award content builds trust signals that live far beyond the post — prospects research companies before calls, and this kind of recognition stays visible on the page permanently.",
    },
  ];

  // Default selected card: #5 ("FIA Expo recap video")
  let active = 4;

  function select(i) {
    active = i;
    render();
  }

  function render() {
    const grid = document.getElementById("c9-grid");
    const media = document.getElementById("c9-media");
    const detail = document.getElementById("c9-detail");
    if (!grid || !detail || !media) return;

    grid.innerHTML = posts
      .map(function (p, i) {
        return (
          '<div class="post-tile' +
          (i === active ? " active" : "") +
          '" data-index="' +
          i +
          '">' +
          '<div class="tile-type">' +
          escapeHtml(p.type) +
          "</div>" +
          '<div class="tile-title">' +
          escapeHtml(p.title) +
          "</div>" +
          '<div class="tile-ctr">' +
          escapeHtml(p.ctr) +
          "</div>" +
          '<div class="tile-ctr-label">CTR</div></div>'
        );
      })
      .join("");

    grid.querySelectorAll(".post-tile").forEach(function (tile) {
      tile.addEventListener("mouseenter", function () {
        const hoveredIndex = parseInt(tile.getAttribute("data-index"), 10);
        if (hoveredIndex === 4) {
          renderMedia(posts[hoveredIndex], media);
        }
      });

      tile.addEventListener("click", function () {
        select(parseInt(tile.getAttribute("data-index"), 10));
      });
    });

    const p = posts[active];
    renderMedia(p, media);
    detail.innerHTML =
      '<div class="detail-header">' +
      '<div class="detail-title">' +
      escapeHtml(p.title) +
      "</div>" +
      '<div class="detail-date">' +
      escapeHtml(p.date) +
      "</div></div>" +
      '<div class="detail-metrics">' +
      '<div class="dm"><div class="dm-val">' +
      p.impressions.toLocaleString() +
      '</div><div class="dm-label">Impressions</div></div>' +
      '<div class="dm"><div class="dm-val">' +
      p.clicks +
      '</div><div class="dm-label">Clicks</div></div>' +
      '<div class="dm"><div class="dm-val">' +
      escapeHtml(p.ctr) +
      '</div><div class="dm-label">CTR</div></div></div>' +
      '<div class="detail-about">' +
      escapeHtml(p.about) +
      "</div>";
  }

  function renderMedia(post, mediaRoot) {
    if (!post || !post.mediaSrc) {
      mediaRoot.innerHTML = "";
      return;
    }

    if (post.mediaType === "video") {
      mediaRoot.innerHTML =
        '<video autoplay muted loop playsinline webkit-playsinline preload="metadata">' +
        '<source src="' +
        escapeHtml(post.mediaSrc) +
        '" type="video/mp4" />' +
        "</video>";
      return;
    }

    mediaRoot.innerHTML = '<img src="' + escapeHtml(post.mediaSrc) + '" alt="' + escapeHtml(post.title) + '" />';
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  render();
})();
