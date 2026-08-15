/* ==========================================================================
   index.js — logic for the home page (index.html) only.
   Fills in the statistics strip and the featured schemes, both calculated
   from the real SCHOLARSHIPS data instead of being hardcoded.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderFeaturedSchemes();
  animateHeroCounter();
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
