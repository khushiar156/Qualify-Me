/* ==========================================================================
   saved.js — logic for saved.html only.
   Reads the saved scheme IDs from localStorage (via getSavedSchemes() in
   common.js), looks each one up in SCHOLARSHIPS, and displays them with
   a "Remove" button instead of the usual "Save" button.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", renderSavedSchemes);

function renderSavedSchemes() {
  const savedIds = getSavedSchemes();
  const grid = document.getElementById("savedGrid");
  const emptyState = document.getElementById("emptySavedState");

  // Turn the saved IDs into full scheme objects, skipping any ID that
  // doesn't match a scheme anymore (in case the dataset changes later).
  const savedSchemes = savedIds.map((id) => getSchemeById(id)).filter(Boolean);

  if (savedSchemes.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  grid.innerHTML = savedSchemes.map((scheme) => renderSavedCard(scheme)).join("");

  // Wire up the "Remove" buttons on this page.
  grid.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", () => {
      removeSavedScheme(button.dataset.id);
      renderNavbar(); // update the "Saved (n)" counter
      renderSavedSchemes(); // re-render the grid without the removed card
    });
  });
}

// A version of the scheme card built specifically for the saved page:
// "View Details" + "Remove" instead of "View Details" + "Save".
function renderSavedCard(scheme) {
  const levelLabel = scheme.level === "central" ? "CENTRAL" : "STATE";
  const stateLine = scheme.state ? `<span class="scheme-card__state">${scheme.state}</span>` : "";

  return `
    <article class="scheme-card">
      <div class="scheme-card__top">
        <span class="stamp stamp--${scheme.level}">${levelLabel}</span>
        ${stateLine}
      </div>
      <h3 class="scheme-card__name">${scheme.name}</h3>
      <p class="scheme-card__provider">${scheme.provider}</p>

      <dl class="scheme-card__facts">
        <div><dt>Benefit</dt><dd>${scheme.amount}</dd></div>
        <div><dt>Income ceiling</dt><dd>${scheme.incomeCeiling}</dd></div>
        <div><dt>Eligible stage</dt><dd>${formatQualifications(scheme.qualifications)}</dd></div>
      </dl>

      <div class="scheme-card__actions">
        <a class="btn btn--small btn--primary" href="scheme.html?id=${scheme.id}">View Details</a>
        <button class="btn btn--small btn--outline-dark remove-btn" data-id="${scheme.id}">Remove</button>
      </div>
    </article>
  `;
}
