/* ==========================================================================
   common.js
   --------------------------------------------------------------------------
   Code shared by EVERY page of the website:
     - injects the navbar and footer (so we only write them once)
     - highlights the active nav link
     - the eligibility MATCHING ENGINE (matchScholarships)
     - helper functions for building scheme cards
     - localStorage helpers for saved schemes
   Every other .js file in this project relies on the functions below.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. NAVBAR + FOOTER
   Instead of copy-pasting the same <nav> and <footer> HTML into all nine
   pages (and risking them going out of sync), each page just includes an
   empty <div id="site-navbar"></div> and <div id="site-footer"></div>,
   and this script fills them in on page load.
   -------------------------------------------------------------------------- */

// List of every page in the main nav, and the file it links to.
const NAV_LINKS = [
  { label: "Home", href: "index.html" },
  { label: "Find Schemes", href: "eligibility.html" },
  { label: "Explore", href: "schemes.html" },
  { label: "Saved", href: "saved.html" },
  { label: "How It Works", href: "how-it-works.html" },
  { label: "FAQ", href: "faq.html" },
  { label: "About", href: "about.html" },
];

function renderNavbar() {
  const navbarContainer = document.getElementById("site-navbar");
  if (!navbarContainer) return; // page didn't include a navbar slot

  // Figure out which page we're currently on, so we can highlight it.
  // e.g. "/qualify-me/schemes.html" -> "schemes.html"
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "" || currentPage === undefined) currentPage = "index.html";

  // Build the list of nav links as HTML, marking the active one.
  const linksHtml = NAV_LINKS.map((link) => {
    const isActive = link.href === currentPage;
    return `<li><a href="${link.href}" class="nav-link${isActive ? " nav-link--active" : ""}"${
      isActive ? ' aria-current="page"' : ""
    }>${link.label}</a></li>`;
  }).join("");

  // Saved-schemes counter shown next to "Saved" in the nav.
  const savedCount = getSavedSchemes().length;

  navbarContainer.innerHTML = `
    <nav class="navbar">
      <div class="navbar__inner">
        <a href="index.html" class="navbar__logo">
          <span class="navbar__logo-mark">&#9673;</span> QUALIFY ME
        </a>

        <button class="navbar__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="navMenu">
          <span></span><span></span><span></span>
        </button>

        <ul class="navbar__links" id="navMenu">
          ${linksHtml}
        </ul>
      </div>
    </nav>
  `;

  // Add the saved-schemes count badge onto the "Saved" link, if there are any.
  if (savedCount > 0) {
    const savedLink = [...navbarContainer.querySelectorAll(".nav-link")].find(
      (a) => a.textContent.trim() === "Saved"
    );
    if (savedLink) {
      savedLink.innerHTML = `Saved <span class="navbar__badge">${savedCount}</span>`;
    }
  }

  // Mobile hamburger menu toggle.
  const toggleBtn = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  toggleBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("navbar__links--open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function renderFooter() {
  const footerContainer = document.getElementById("site-footer");
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__brand">
          <span class="site-footer__mark">&#9673;</span> QUALIFY ME
          <p>Scholarships &amp; Government Schemes</p>
        </div>
        <p class="site-footer__text">
          An informational student project designed to simplify scholarship discovery.
          Always verify eligibility, deadlines, amounts and application requirements
          on the official portal before applying.
        </p>
        <p class="site-footer__copy">&copy; 2026 Qualify Me. Built as a college frontend project.</p>
      </div>
    </footer>
  `;
}

/* --------------------------------------------------------------------------
   2. THE MATCHING ENGINE
   This is the most important function in the whole project. It takes the
   user's profile (age, qualification, category, state) and checks it
   against every scheme in SCHOLARSHIPS, returning only the ones the user
   is eligible for.
   -------------------------------------------------------------------------- */

/**
 * matchScholarships(profile, scholarships)
 *
 * @param {Object} profile - { age, qualification, category, state }
 * @param {Array}  scholarships - list of scheme objects (usually SCHOLARSHIPS)
 * @returns {Array} the schemes the profile is eligible for
 */
function matchScholarships(profile, scholarships) {
  return scholarships.filter((scheme) => {
    // --- AGE CHECK ---
    // The user's age must fall inside the scheme's [minAge, maxAge] range.
    const ageOk = profile.age >= scheme.minAge && profile.age <= scheme.maxAge;
    if (!ageOk) return false;

    // --- QUALIFICATION CHECK ---
    // The user's qualification must be one of the scheme's accepted levels.
    const qualificationOk = scheme.qualifications.includes(profile.qualification);
    if (!qualificationOk) return false;

    // --- CATEGORY CHECK ---
    // A scheme open to "any" category matches everyone.
    // Otherwise, the user's category must be listed on the scheme.
    const categoryOk =
      scheme.categories.includes("any") || scheme.categories.includes(profile.category);
    if (!categoryOk) return false;

    // --- STATE CHECK ---
    // Central schemes are not tied to a state, so they always pass this check.
    // State schemes only match when the user picked that exact state.
    // If the user chose "Not sure / Skip" (empty string), only central
    // schemes are shown, since we can't confirm a state match.
    const stateOk = scheme.level === "central" || scheme.state === profile.state;
    if (!stateOk) return false;

    return true; // scheme passed every check
  });
}

/* --------------------------------------------------------------------------
   3. SCHEME CARD BUILDER
   Several pages (home, results, schemes) need to show a scheme as a card.
   This one function builds that HTML so the markup stays identical
   everywhere and we don't repeat ourselves.
   -------------------------------------------------------------------------- */

/**
 * renderSchemeCard(scheme, options)
 * options.showSave - whether to include a "Save" button (default true)
 */
function renderSchemeCard(scheme, options = {}) {
  const showSave = options.showSave !== false;
  const isSaved = getSavedSchemes().includes(scheme.id);
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
        <a class="btn btn--small btn--primary" href="scheme.html?id=${scheme.id}">View Details <span class="btn__arrow">&rarr;</span></a>
        ${
          showSave
            ? `<button class="btn btn--small btn--ghost save-btn" data-id="${scheme.id}" aria-pressed="${isSaved}">
                ${isSaved ? "Saved &#10003;" : "&#9825; Save"}
              </button>`
            : ""
        }
      </div>
    </article>
  `;
}

// Turns ["ug","diploma"] into "Undergraduate, Diploma" using QUALIFICATION_LEVELS labels.
function formatQualifications(qualificationValues) {
  return qualificationValues
    .map((value) => {
      const match = QUALIFICATION_LEVELS.find((level) => level.value === value);
      return match ? match.label : value;
    })
    .join(", ");
}

// Attaches click handling to every "Save" button rendered inside a container.
// Call this again after re-rendering cards (e.g. after filtering).
function wireUpSaveButtons(container) {
  container.querySelectorAll(".save-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const schemeId = button.dataset.id;
      toggleSavedScheme(schemeId);
      const nowSaved = getSavedSchemes().includes(schemeId);
      button.setAttribute("aria-pressed", nowSaved);
      button.innerHTML = nowSaved ? "Saved &#10003;" : "&#9825; Save";
      button.classList.add("save-btn--pulse");
      setTimeout(() => button.classList.remove("save-btn--pulse"), 300);
      renderNavbar(); // refresh the "Saved (n)" counter in the nav
    });
  });
}

/* --------------------------------------------------------------------------
   4. LOCAL STORAGE — SAVED SCHEMES
   Saved schemes need to survive a page refresh or the browser closing, so
   we use localStorage (unlike the eligibility profile, which only needs
   to last for one browsing session — see sessionStorage in eligibility.js).
   -------------------------------------------------------------------------- */

const SAVED_SCHEMES_KEY = "qualifyMeSaved";

// Returns an array of saved scheme IDs, e.g. ["pragati", "saksham"]
function getSavedSchemes() {
  const stored = localStorage.getItem(SAVED_SCHEMES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveScheme(schemeId) {
  const saved = getSavedSchemes();
  if (!saved.includes(schemeId)) {
    saved.push(schemeId);
    localStorage.setItem(SAVED_SCHEMES_KEY, JSON.stringify(saved));
  }
}

function removeSavedScheme(schemeId) {
  const saved = getSavedSchemes().filter((id) => id !== schemeId);
  localStorage.setItem(SAVED_SCHEMES_KEY, JSON.stringify(saved));
}

// Adds the scheme if it isn't saved yet, removes it if it already is.
function toggleSavedScheme(schemeId) {
  const saved = getSavedSchemes();
  if (saved.includes(schemeId)) {
    removeSavedScheme(schemeId);
  } else {
    saveScheme(schemeId);
  }
}

// Looks up one scheme by its ID. Used by scheme.html.
function getSchemeById(schemeId) {
  return SCHOLARSHIPS.find((scheme) => scheme.id === schemeId);
}

/* --------------------------------------------------------------------------
   5. PAGE TRANSITIONS & RUN ON EVERY PAGE LOAD
   -------------------------------------------------------------------------- */
function initPageTransitions() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    document.body.classList.add("page-transition-enter");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.remove("page-transition-enter");
      });
    });
  }

  document.addEventListener("click", (e) => {
    if (prefersReducedMotion) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

    const anchor = e.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href) return;

    if (
      href.startsWith("#") ||
      href.startsWith("javascript:") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      anchor.getAttribute("target") === "_blank" ||
      anchor.hasAttribute("download")
    ) {
      return;
    }

    let targetUrl;
    try {
      targetUrl = new URL(anchor.href, window.location.href);
    } catch (err) {
      return;
    }

    const currentUrl = new URL(window.location.href);
    if (targetUrl.origin !== currentUrl.origin) return;
    if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search && targetUrl.hash) {
      return;
    }

    e.preventDefault();
    document.body.classList.add("page-transition-exit");

    setTimeout(() => {
      window.location.href = anchor.href;
    }, 220);
  });

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("page-transition-exit", "page-transition-enter");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initPageTransitions();
  renderNavbar();
  renderFooter();
});
