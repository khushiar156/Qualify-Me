/* ==========================================================================
   scheme-details.js — logic for scheme.html only.
   Reads the "id" query parameter from the URL (e.g. scheme.html?id=pragati),
   looks it up in SCHOLARSHIPS using getSchemeById() from common.js, and
   fills in the page. Shows a "not found" state for an invalid/missing ID.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const schemeId = params.get("id");
  const scheme = schemeId ? getSchemeById(schemeId) : null;

  if (!scheme) {
    document.getElementById("notFoundState").style.display = "block";
    return;
  }

  document.getElementById("schemeContent").style.display = "block";
  document.title = `${scheme.name} — Qualify Me`;

  fillInSchemeDetails(scheme);
  setupSaveButton(scheme);
});

function fillInSchemeDetails(scheme) {
  const stampEl = document.getElementById("detailStamp");
  stampEl.textContent = scheme.level === "central" ? "CENTRAL SCHEME" : "STATE SCHEME";
  stampEl.className = `stamp stamp--${scheme.level}`;

  document.getElementById("detailName").textContent = scheme.name;
  document.getElementById("detailProvider").textContent =
    scheme.provider + (scheme.state ? ` \u00b7 ${scheme.state}` : "");

  document.getElementById("detailAbout").textContent = scheme.about;
  document.getElementById("detailBenefit").textContent = scheme.amount;

  document.getElementById("detailAge").textContent = `${scheme.minAge}\u2013${scheme.maxAge} years`;
  document.getElementById("detailQualification").textContent = formatQualifications(
    scheme.qualifications
  );
  document.getElementById("detailCategory").textContent = scheme.categories.includes("any")
    ? "Open to all categories"
    : scheme.categories.map((c) => labelForCategory(c)).join(", ");
  document.getElementById("detailIncome").textContent = scheme.incomeCeiling;

  document.getElementById("detailStateNote").textContent =
    scheme.level === "central"
      ? "This is a central scheme — it is checked regardless of state."
      : `This is a state scheme — only available to applicants in ${scheme.state}.`;

  const notesBlock = document.getElementById("notesBlock");
  if (scheme.notes) {
    document.getElementById("detailNotes").textContent = scheme.notes;
  } else {
    notesBlock.style.display = "none";
  }

  const portalLink = document.getElementById("detailPortalLink");
  portalLink.href = scheme.portal;

  document.getElementById(
    "detailVerified"
  ).textContent = `Last checked: ${formatDate(scheme.verifiedOn)}`;
}

function labelForCategory(value) {
  const match = CATEGORY_OPTIONS.find((c) => c.value === value);
  return match ? match.label : value;
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function setupSaveButton(scheme) {
  const button = document.getElementById("detailSaveBtn");

  function refreshButtonLabel() {
    const isSaved = getSavedSchemes().includes(scheme.id);
    button.innerHTML = isSaved ? "Saved &#10003;" : "&#9825; Save Scheme";
    button.setAttribute("aria-pressed", isSaved);
  }

  refreshButtonLabel();

  button.addEventListener("click", () => {
    toggleSavedScheme(scheme.id);
    refreshButtonLabel();
    button.classList.add("save-btn--pulse");
    setTimeout(() => button.classList.remove("save-btn--pulse"), 300);
    renderNavbar(); // keep the "Saved (n)" counter accurate
  });
}
