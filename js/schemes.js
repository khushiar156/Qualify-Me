/* ==========================================================================
   schemes.js — logic for schemes.html only.
   A browse/search page: lets the user search by keyword and filter by
   level, qualification and category, all client-side against SCHOLARSHIPS.
   ========================================================================== */

// Qualification filter options, matching the wording used in the brief.
const QUALIFICATION_FILTERS = [
  { value: "all", label: "All" },
  { value: "class10", label: "Class 10" },
  { value: "class12", label: "Class 12" },
  { value: "diploma", label: "Diploma" },
  { value: "ug", label: "Undergraduate" },
  { value: "pg", label: "Postgraduate" },
  { value: "phd", label: "PhD" },
];

// Category filter options (a shorter list than the full CATEGORY_OPTIONS,
// matching what's asked for on this page).
const CATEGORY_FILTERS = [
  { value: "all", label: "All" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "obc", label: "OBC" },
  { value: "ews", label: "EWS" },
  { value: "disability", label: "Disability" },
  { value: "minority", label: "Minority" },
];

let activeLevel = "all";

document.addEventListener("DOMContentLoaded", () => {
  populateFilterDropdown("qualificationFilter", QUALIFICATION_FILTERS);
  populateFilterDropdown("categoryFilter", CATEGORY_FILTERS);
  setupLevelPills();
  setupTextAndDropdownFilters();
  renderFilteredSchemes();
});

function populateFilterDropdown(selectId, options) {
  const select = document.getElementById(selectId);
  options.forEach((opt) => {
    if (opt.value === "all") return; // "All" is already in the HTML
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    select.appendChild(option);
  });
}

function setupLevelPills() {
  const buttons = document.querySelectorAll("#levelFilter .pill");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("pill--active"));
      button.classList.add("pill--active");
      activeLevel = button.dataset.level;
      renderFilteredSchemes();
    });
  });
}

function setupTextAndDropdownFilters() {
  document.getElementById("searchInput").addEventListener("input", renderFilteredSchemes);
  document.getElementById("qualificationFilter").addEventListener("change", renderFilteredSchemes);
  document.getElementById("categoryFilter").addEventListener("change", renderFilteredSchemes);

  document.getElementById("resetFiltersBtn").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("qualificationFilter").value = "all";
    document.getElementById("categoryFilter").value = "all";
    activeLevel = "all";
    document.querySelectorAll("#levelFilter .pill").forEach((b, i) => {
      b.classList.toggle("pill--active", i === 0);
    });
    renderFilteredSchemes();
  });
}

function renderFilteredSchemes() {
  const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  const qualificationValue = document.getElementById("qualificationFilter").value;
  const categoryValue = document.getElementById("categoryFilter").value;

  const filtered = SCHOLARSHIPS.filter((scheme) => {
    // --- Search: match against name, provider or state ---
    const searchableText = `${scheme.name} ${scheme.provider} ${scheme.state || ""}`.toLowerCase();
    const matchesSearch = searchTerm === "" || searchableText.includes(searchTerm);

    // --- Level filter ---
    const matchesLevel = activeLevel === "all" || scheme.level === activeLevel;

    // --- Qualification filter ---
    const matchesQualification =
      qualificationValue === "all" || scheme.qualifications.includes(qualificationValue);

    // --- Category filter ---
    const matchesCategory =
      categoryValue === "all" ||
      scheme.categories.includes("any") ||
      scheme.categories.includes(categoryValue);

    return matchesSearch && matchesLevel && matchesQualification && matchesCategory;
  });

  const grid = document.getElementById("schemesGrid");
  const noResults = document.getElementById("noResultsState");
  const resultCount = document.getElementById("resultCount");

  resultCount.textContent = `${filtered.length} scheme${filtered.length === 1 ? "" : "s"} found`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  grid.innerHTML = filtered.map((scheme) => renderSchemeCard(scheme)).join("");
  wireUpSaveButtons(grid);
}
