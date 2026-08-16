/* ==========================================================================
   scholarshipsData.js
   --------------------------------------------------------------------------
   Central data store for all scholarship schemes, options, FAQ items, and
   matching logic. Exported for clean consumption across React components.
   ========================================================================== */

export const QUALIFICATION_LEVELS = [
  { value: "below10", label: "Below Class 10" },
  { value: "class10", label: "Class 10 pass" },
  { value: "class12", label: "Class 12 pass" },
  { value: "diploma", label: "Diploma" },
  { value: "ug", label: "Undergraduate" },
  { value: "pg", label: "Postgraduate" },
  { value: "phd", label: "PhD" },
];

export const CATEGORY_OPTIONS = [
  { value: "any", label: "General / Prefer not to say" },
  { value: "sc", label: "Scheduled Caste (SC)" },
  { value: "st", label: "Scheduled Tribe (ST)" },
  { value: "obc", label: "Other Backward Class (OBC)" },
  { value: "ews", label: "Economically Weaker Section (EWS)" },
  { value: "minority", label: "Minority Community" },
  { value: "disability", label: "Person with Disability" },
  { value: "denotified", label: "De-notified / Nomadic Tribe" },
];

export const STATE_OPTIONS = ["Punjab", "Haryana"];

export const SCHOLARSHIPS = [
  {
    id: "pragati",
    name: "AICTE Pragati Scholarship for Girls",
    provider: "All India Council for Technical Education",
    level: "central",
    state: null,
    minAge: 16,
    maxAge: 30,
    qualifications: ["diploma", "ug"],
    categories: ["any"],
    incomeCeiling: "₹8,00,000 per annum (family income)",
    amount: "₹50,000 / year",
    about:
      "A central scheme supporting girl students pursuing technical diploma or degree courses, aimed at reducing the dropout rate among female students in technical education.",
    portal: "https://www.aicte-india.org/schemes/students-development-schemes",
    verifiedOn: "2026-01-15",
    notes: "Limited to two girl children per family. Applicable to AICTE-approved institutions only.",
  },
  {
    id: "saksham",
    name: "AICTE Saksham Scholarship",
    provider: "All India Council for Technical Education",
    level: "central",
    state: null,
    minAge: 16,
    maxAge: 30,
    qualifications: ["diploma", "ug"],
    categories: ["disability"],
    incomeCeiling: "₹8,00,000 per annum (family income)",
    amount: "₹50,000 / year",
    about:
      "Financial assistance for differently-abled students pursuing technical education, to help cover tuition and other academic expenses.",
    portal: "https://www.aicte-india.org/schemes/students-development-schemes",
    verifiedOn: "2026-01-15",
    notes: "Requires a valid disability certificate of 40% or above.",
  },
  {
    id: "nsp-pre-matric",
    name: "Pre-Matric Scholarship for SC Students",
    provider: "Ministry of Social Justice & Empowerment",
    level: "central",
    state: null,
    minAge: 10,
    maxAge: 18,
    qualifications: ["below10", "class10"],
    categories: ["sc"],
    incomeCeiling: "₹2,50,000 per annum (family income)",
    amount: "Up to ₹5,000 / year",
    about:
      "Supports SC students studying in Class 9 and 10 with a maintenance allowance and reimbursement of certain fees to reduce dropout rates before matriculation.",
    portal: "https://scholarships.gov.in",
    verifiedOn: "2026-01-10",
    notes: "Applied for through the National Scholarship Portal (NSP).",
  },
  {
    id: "nsp-post-matric-sc",
    name: "Post-Matric Scholarship for SC Students",
    provider: "Ministry of Social Justice & Empowerment",
    level: "central",
    state: null,
    minAge: 16,
    maxAge: 35,
    qualifications: ["class12", "diploma", "ug", "pg", "phd"],
    categories: ["sc"],
    incomeCeiling: "₹2,50,000 per annum (family income)",
    amount: "Course fee + maintenance allowance",
    about:
      "A central assistance scheme for SC students studying beyond Class 10, covering tuition fees, maintenance allowance and other compulsory charges.",
    portal: "https://scholarships.gov.in",
    verifiedOn: "2026-01-10",
    notes: "Renewable every year subject to minimum attendance and passing marks.",
  },
  {
    id: "nsp-obc",
    name: "Post-Matric Scholarship for OBC Students",
    provider: "Ministry of Social Justice & Empowerment",
    level: "central",
    state: null,
    minAge: 16,
    maxAge: 30,
    qualifications: ["class12", "diploma", "ug", "pg"],
    categories: ["obc"],
    incomeCeiling: "₹1,50,000 per annum (family income)",
    amount: "Course fee + maintenance allowance",
    about:
      "Financial support for OBC students pursuing studies after Class 10, intended to reduce the financial burden of tuition and hostel expenses.",
    portal: "https://scholarships.gov.in",
    verifiedOn: "2026-01-10",
    notes: "Income ceiling and amount vary slightly by state; check NSP for exact figures.",
  },
  {
    id: "minority-merit",
    name: "Merit-cum-Means Scholarship for Minorities",
    provider: "Ministry of Minority Affairs",
    level: "central",
    state: null,
    minAge: 17,
    maxAge: 30,
    qualifications: ["ug", "pg"],
    categories: ["minority"],
    incomeCeiling: "₹2,50,000 per annum (family income)",
    amount: "Up to ₹20,000 / year",
    about:
      "Supports meritorious students from notified minority communities studying professional and technical courses at undergraduate and postgraduate level.",
    portal: "https://scholarships.gov.in",
    verifiedOn: "2026-01-12",
    notes: "Minimum 50% marks in the previous qualifying exam is generally required.",
  },
  {
    id: "central-sector",
    name: "Central Sector Scheme of Scholarship",
    provider: "Department of Higher Education",
    level: "central",
    state: null,
    minAge: 17,
    maxAge: 25,
    qualifications: ["ug", "pg"],
    categories: ["any"],
    incomeCeiling: "₹4,50,000 per annum (family income)",
    amount: "₹10,000 – ₹20,000 / year",
    about:
      "A merit-based scholarship for college and university students who scored in the top percentile of their Class 12 board examinations.",
    portal: "https://scholarships.gov.in",
    verifiedOn: "2026-01-08",
    notes: "Selection is based on Class 12 marks; separate quotas exist for different boards.",
  },
  {
    id: "ews-central",
    name: "EWS Higher Education Assistance Scheme",
    provider: "Department of Higher Education",
    level: "central",
    state: null,
    minAge: 17,
    maxAge: 30,
    qualifications: ["ug", "pg"],
    categories: ["ews"],
    incomeCeiling: "₹8,00,000 per annum (family income)",
    amount: "Up to ₹15,000 / year",
    about:
      "Provides financial assistance to students from Economically Weaker Sections pursuing undergraduate or postgraduate studies.",
    portal: "https://scholarships.gov.in",
    verifiedOn: "2026-01-08",
    notes: "A valid EWS certificate issued by a competent authority is required.",
  },
  {
    id: "phd-fellowship",
    name: "National Fellowship for Research Scholars",
    provider: "University Grants Commission",
    level: "central",
    state: null,
    minAge: 21,
    maxAge: 35,
    qualifications: ["phd"],
    categories: ["any"],
    incomeCeiling: "No income ceiling",
    amount: "₹37,000 / month",
    about:
      "A monthly fellowship for research scholars pursuing a full-time PhD at recognised Indian universities, meant to support living and research expenses.",
    portal: "https://www.ugc.gov.in",
    verifiedOn: "2026-01-05",
    notes: "Requires clearing NET/JRF or an equivalent qualifying test.",
  },
  {
    id: "punjab-merit",
    name: "Punjab State Merit Scholarship",
    provider: "Department of Higher Education, Punjab",
    level: "state",
    state: "Punjab",
    minAge: 17,
    maxAge: 25,
    qualifications: ["ug", "pg"],
    categories: ["any"],
    incomeCeiling: "₹6,00,000 per annum (family income)",
    amount: "₹12,000 / year",
    about:
      "A state-run merit scholarship for Punjab-domiciled students enrolled in recognised colleges and universities within the state.",
    portal: "https://punjab.gov.in",
    verifiedOn: "2026-01-11",
    notes: "Applicant must have a valid Punjab domicile certificate.",
  },
  {
    id: "punjab-sc-postmatric",
    name: "Punjab Post-Matric Scholarship for SC Students",
    provider: "Department of Social Justice, Punjab",
    level: "state",
    state: "Punjab",
    minAge: 15,
    maxAge: 30,
    qualifications: ["class12", "diploma", "ug", "pg"],
    categories: ["sc"],
    incomeCeiling: "₹2,50,000 per annum (family income)",
    amount: "Tuition fee reimbursement",
    about:
      "State-level assistance for SC students of Punjab pursuing education after Class 10, covering tuition fees at government and aided institutions.",
    portal: "https://punjab.gov.in",
    verifiedOn: "2026-01-11",
    notes: "Applicable only to institutions located within Punjab.",
  },
  {
    id: "haryana-saksham-yuva",
    name: "Haryana Saksham Yuva Scholarship",
    provider: "Department of Higher Education, Haryana",
    level: "state",
    state: "Haryana",
    minAge: 18,
    maxAge: 25,
    qualifications: ["ug", "pg"],
    categories: ["any"],
    incomeCeiling: "₹3,00,000 per annum (family income)",
    amount: "₹9,000 / year",
    about:
      "A state scheme supporting unemployed educated youth of Haryana while they continue higher studies or search for suitable employment.",
    portal: "https://haryana.gov.in",
    verifiedOn: "2026-01-09",
    notes: "Applicant must be registered with the Haryana employment exchange.",
  },
  {
    id: "haryana-girl-child",
    name: "Haryana Girl Child Education Scheme",
    provider: "Department of Women & Child Development, Haryana",
    level: "state",
    state: "Haryana",
    minAge: 14,
    maxAge: 22,
    qualifications: ["class10", "class12", "diploma"],
    categories: ["any"],
    incomeCeiling: "₹1,80,000 per annum (family income)",
    amount: "₹8,000 / year",
    about:
      "Encourages continued education of the girl child in Haryana beyond Class 10 through a yearly cash incentive.",
    portal: "https://haryana.gov.in",
    verifiedOn: "2026-01-09",
    notes: "Applicant must be a resident of Haryana with a valid family ID (Parivar Pehchan Patra).",
  },
  {
    id: "denotified-central",
    name: "Central Scholarship for De-notified & Nomadic Tribes",
    provider: "Ministry of Social Justice & Empowerment",
    level: "central",
    state: null,
    minAge: 15,
    maxAge: 30,
    qualifications: ["class10", "class12", "diploma", "ug"],
    categories: ["denotified"],
    incomeCeiling: "₹2,50,000 per annum (family income)",
    amount: "Course fee + maintenance allowance",
    about:
      "Supports students from De-notified, Nomadic and Semi-Nomadic Tribes to continue education beyond Class 10 through fee support and a maintenance allowance.",
    portal: "https://scholarships.gov.in",
    verifiedOn: "2026-01-13",
    notes: "Community certificate from a competent authority is mandatory.",
  },
  {
    id: "top-class-education",
    name: "Top Class Education Scheme for SC Students",
    provider: "Ministry of Social Justice & Empowerment",
    level: "central",
    state: null,
    minAge: 17,
    maxAge: 30,
    qualifications: ["ug", "pg"],
    categories: ["sc"],
    incomeCeiling: "₹8,00,000 per annum (family income)",
    amount: "Full tuition + living allowance",
    about:
      "Covers full tuition fees and a living allowance for SC students admitted to a list of top-ranked institutions notified under the scheme.",
    portal: "https://scholarships.gov.in",
    verifiedOn: "2026-01-14",
    notes: "Only applicable at institutions specifically notified under this scheme.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What is Qualify Me?",
    answer:
      "Qualify Me is a student project that helps you discover scholarships and government schemes that match your age, education, category and state, so you don't have to search through many different websites.",
  },
  {
    question: "Is Qualify Me an official government website?",
    answer:
      "No. Qualify Me is an informational student/college project, not an official government portal. It's built to demonstrate frontend web development skills using a sample scholarship dataset.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No account or signup is needed. You can check your eligibility, browse schemes and save the ones you like without logging in.",
  },
  {
    question: "Does Qualify Me store my personal information?",
    answer:
      "Your eligibility details are kept only in your browser's sessionStorage for the current visit, and saved schemes are kept in your browser's localStorage. None of this data is sent to a server or stored anywhere else.",
  },
  {
    question: "Why didn't I get any matching schemes?",
    answer:
      "This usually means one of your details — age, qualification, category or state — doesn't fall within the criteria of any scheme in the dataset. Try adjusting your details or browse all schemes directly.",
  },
  {
    question: "Can I apply directly through Qualify Me?",
    answer:
      "Not directly. Each scheme's detail page links to its official portal, where you can read the current notification and apply through the proper channel.",
  },
  {
    question: "Are the scholarship amounts guaranteed?",
    answer:
      "No. The amounts, ceilings and dates shown are part of an illustrative demo dataset and are not guaranteed. Always confirm the current figures on the official portal before making any decisions.",
  },
  {
    question: "How should I verify a scholarship?",
    answer:
      "Open the scheme's official portal link from its detail page and check the latest notification for the current eligibility criteria, benefit amount, deadline and required documents.",
  },
  {
    question: "Can I save scholarships?",
    answer:
      "Yes. Click the Save button on any scheme card or detail page, and it will appear on your Saved Schemes page until you remove it.",
  },
  {
    question: "What information is used for matching?",
    answer:
      "Only four details: your age, your current or highest qualification, your social category, and your state. These are compared against each scheme's listed eligibility conditions.",
  },
];

/**
 * Pure Functional Matching Engine
 * Checks user profile against SCHOLARSHIPS criteria.
 */
export function matchScholarships(profile, scholarships = SCHOLARSHIPS) {
  if (!profile || !profile.age || !profile.qualification || !profile.category) {
    return [];
  }

  return scholarships.filter((scheme) => {
    // --- AGE CHECK ---
    const ageOk = profile.age >= scheme.minAge && profile.age <= scheme.maxAge;
    if (!ageOk) return false;

    // --- QUALIFICATION CHECK ---
    const qualificationOk = scheme.qualifications.includes(profile.qualification);
    if (!qualificationOk) return false;

    // --- CATEGORY CHECK ---
    const categoryOk =
      scheme.categories.includes("any") || scheme.categories.includes(profile.category);
    if (!categoryOk) return false;

    // --- STATE CHECK ---
    const stateOk = scheme.level === "central" || scheme.state === profile.state;
    if (!stateOk) return false;

    return true;
  });
}

/**
 * Turns ["ug","diploma"] into "Undergraduate, Diploma"
 */
export function formatQualifications(qualificationValues) {
  if (!qualificationValues || !Array.isArray(qualificationValues)) return "";
  return qualificationValues
    .map((value) => {
      const match = QUALIFICATION_LEVELS.find((level) => level.value === value);
      return match ? match.label : value;
    })
    .join(", ");
}

/**
 * Returns single scheme object by ID
 */
export function getSchemeById(id) {
  return SCHOLARSHIPS.find((s) => s.id === id) || null;
}
