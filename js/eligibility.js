/* ==========================================================================
   eligibility.js — logic for eligibility.html only.
   Populates the dropdowns from data.js, validates the form, then on submit
   saves the user's profile to sessionStorage and sends them to results.html.

   Why sessionStorage and not localStorage?
   The eligibility profile only needs to last for the current visit — once
   the user closes the tab, there's no need to remember it. sessionStorage
   is cleared automatically when the tab/browser closes, which fits this
   use case better than localStorage (which we use for SAVED schemes,
   since those should survive between visits).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  populateQualificationDropdown();
  populateCategoryDropdown();
  populateStateDropdown();
  setupFormValidation();
});

function populateQualificationDropdown() {
  const select = document.getElementById("qualification");
  QUALIFICATION_LEVELS.forEach((level) => {
    const option = document.createElement("option");
    option.value = level.value;
    option.textContent = level.label;
    select.appendChild(option);
  });
}

function populateCategoryDropdown() {
  const select = document.getElementById("category");
  CATEGORY_OPTIONS.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.value;
    option.textContent = category.label;
    select.appendChild(option);
  });
}

function populateStateDropdown() {
  const select = document.getElementById("state");
  STATE_OPTIONS.forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    select.appendChild(option);
  });
}

function setupFormValidation() {
  const form = document.getElementById("eligibilityForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // don't actually submit anywhere — we handle it in JS

    const age = Number(document.getElementById("age").value);
    const qualification = document.getElementById("qualification").value;
    const category = document.getElementById("category").value;
    const state = document.getElementById("state").value;

    // Run each field through a simple validity check.
    const ageValid = age >= 1 && age <= 100;
    const qualificationValid = qualification !== "";
    const categoryValid = category !== "";

    toggleFieldError("ageField", !ageValid);
    toggleFieldError("qualificationField", !qualificationValid);
    toggleFieldError("categoryField", !categoryValid);

    if (!ageValid || !qualificationValid || !categoryValid) {
      return; // stop here — don't navigate away with bad data
    }

    // Build the profile object and hand it to matchScholarships()
    // from common.js — this way the SAME matching logic is reused on
    // results.html when it needs to run the check again.
    const profile = { age, qualification, category, state };

    // Save the profile so results.html can read it back.
    sessionStorage.setItem("qualifyMeProfile", JSON.stringify(profile));

    window.location.href = "results.html";
  });

  document.getElementById("clearBtn").addEventListener("click", () => {
    // Remove any leftover error states when the form is cleared.
    ["ageField", "qualificationField", "categoryField"].forEach((id) =>
      toggleFieldError(id, false)
    );
  });
}

function toggleFieldError(fieldId, showError) {
  document.getElementById(fieldId).classList.toggle("form-field--invalid", showError);
}
