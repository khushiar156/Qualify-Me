/* ==========================================================================
   index.js — logic for the home page (index.html) only.
   Fills in the statistics strip and the featured schemes, both calculated
   from the real SCHOLARSHIPS data instead of being hardcoded.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderFeaturedSchemes();
  animateHeroCounter();
  initTypewriter();
});

function renderStats() {
  const statsStrip = document.getElementById("statsStrip");

  // Count how many unique states have at least one state-level scheme.
  const uniqueStates = new Set(
    SCHOLARSHIPS.filter((scheme) => scheme.state).map((scheme) => scheme.state)
  );

  const stats = [
    { number: `${SCHOLARSHIPS.length}+`, label: "Schemes Listed" },
    { number: uniqueStates.size, label: "States Covered" },
    { number: QUALIFICATION_LEVELS.length, label: "Qualification Levels" },
  ];

  statsStrip.innerHTML = stats
    .map(
      (stat) => `
      <div class="stats__item">
        <span class="stats__number">${stat.number}</span>
        <span class="stats__label">${stat.label}</span>
      </div>
    `
    )
    .join("");
}

function renderFeaturedSchemes() {
  const featuredContainer = document.getElementById("featuredSchemes");
  // Just take the first 4 schemes from the dataset as "featured".
  const featured = SCHOLARSHIPS.slice(0, 4);
  featuredContainer.innerHTML = featured.map((scheme) => renderSchemeCard(scheme)).join("");
  wireUpSaveButtons(featuredContainer);
}

// Small touch: animate the "Schemes found" number in the hero case-file
// counting up from 0 to the real scheme count, just for a bit of polish.
function animateHeroCounter() {
  const counterEl = document.getElementById("heroSchemeCount");
  const target = SCHOLARSHIPS.length;
  let current = 0;
  const step = Math.max(1, Math.round(target / 20));

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counterEl.textContent = String(current).padStart(2, "0");
  }, 40);
}

/**
 * initTypewriter()
 * Smooth typewriter animation for the hero heading lines ("Find what you" / "qualify for.").
 * Reveals characters sequentially from left to right on page load and removes the caret when finished.
 */
function initTypewriter() {
  const lineEls = document.querySelectorAll(".hero__title .hero__title-line");
  if (!lineEls.length) return;

  const lineData = Array.from(lineEls).map((el) => ({
    el,
    text: el.dataset.text || el.textContent.trim(),
  }));

  // Ensure elements start empty on load
  lineData.forEach(({ el }) => {
    el.textContent = "";
    el.classList.remove("hero__title-line--typing");
  });

  // Respect reduced motion settings
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    lineData.forEach(({ el, text }) => {
      el.textContent = text;
    });
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  const charSpeed = 80; // ~80ms per character for a natural typing feel

  function typeNextChar() {
    if (lineIndex >= lineData.length) {
      // Finished all lines! Ensure no cursor remains visible or blinks.
      lineData.forEach(({ el }) => el.classList.remove("hero__title-line--typing"));
      return;
    }

    const currentLine = lineData[lineIndex];

    if (!currentLine.el.classList.contains("hero__title-line--typing")) {
      lineData.forEach(({ el }) => el.classList.remove("hero__title-line--typing"));
      currentLine.el.classList.add("hero__title-line--typing");
    }

    if (charIndex < currentLine.text.length) {
      currentLine.el.textContent += currentLine.text.charAt(charIndex);
      charIndex++;
      setTimeout(typeNextChar, charSpeed);
    } else {
      // Completed current line; remove typing class and move to the next line
      currentLine.el.classList.remove("hero__title-line--typing");
      lineIndex++;
      charIndex = 0;
      if (lineIndex < lineData.length) {
        setTimeout(typeNextChar, 150); // short pause before typing next line
      }
    }
  }

  // Slight initial pause after load before typing starts
  setTimeout(typeNextChar, 200);
}
