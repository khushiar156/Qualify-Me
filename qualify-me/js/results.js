/* ==========================================================================
   results.js — logic for results.html only.
   Reads the profile the user submitted on eligibility.html (saved in
   sessionStorage), re-runs matchScholarships() from common.js against the
   full SCHOLARSHIPS list, and displays the matches with simple client-side
   filtering and sorting.
   ========================================================================== */

let currentMatches = []; // the full set of matches, before level-filtering
let activeLevelFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  const profile = readProfileFromSession();

  if (!profile) {
    // The user landed here without filling the form first (e.g. typed
    // the URL directly). Show a friendly message instead of an error.
    document.getElementById("noProfileState").style.display = "block";
    document.getElementById("filterBar").style.display = "none";
    return;
  }

  // Re-run the SAME matching function used on the eligibility page.
  // This keeps the matching logic in exactly one place (common.js).
  currentMatches = matchScholarships(profile, SCHOLARSHIPS);

  renderResultsHeader(profile, currentMatches.length);
  renderResults();
  setupFilters();
  setupSorting();
});

function readProfileFromSession() {
  const stored = sessionStorage.getItem("qualifyMeProfile");
  return stored ? JSON.parse(stored) : null;
}

function renderResultsHeader(profile, matchCount) {
  document.getElementById(
    "resultsMeta"
  ).innerHTML = `<strong>${matchCount}</strong> scheme${matchCount === 1 ? "" : "s"} matched<br />Based on: Age ${
    profile.age
  } &bull; ${formatQualifications([profile.qualification])} &bull; ${profile.state || "Any state"}`;
}

function setupFilters() {
  const buttons = document.querySelectorAll("#levelFilter .pill");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("pill--active"));
      button.classList.add("pill--active");
      activeLevelFilter = button.dataset.level;
      renderResults();
    });
  });
}

function setupSorting() {
  document.getElementById("sortSelect").addEventListener("change", renderResults);
}

function renderResults() {
  const grid = document.getElementById("resultsGrid");
  const emptyState = document.getElementById("emptyState");

  // Step 1: apply the level filter (All / Central / State).
  let visibleSchemes = currentMatches.filter((scheme) => {
    if (activeLevelFilter === "all") return true;
    return scheme.level === activeLevelFilter;
  });

  // Step 2: apply the chosen sort order.
  const sortValue = document.getElementById("sortSelect").value;
  visibleSchemes = [...visibleSchemes].sort((a, b) => {
    if (sortValue === "name-asc") return a.name.localeCompare(b.name);
    if (sortValue === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  if (currentMatches.length === 0) {
    // No matches at all — show the main empty state, hide the filter bar.
    grid.innerHTML = "";
    emptyState.style.display = "block";
    document.getElementById("filterBar").style.display = "none";
    return;
  }

  if (visibleSchemes.length === 0) {
    grid.innerHTML = `<p class="form-hint">No schemes match this filter. Try "All".</p>`;
    return;
  }

  grid.innerHTML = visibleSchemes.map((scheme) => renderSchemeCard(scheme)).join("");
  wireUpSaveButtons(grid);
}
