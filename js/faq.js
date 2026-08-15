/* ==========================================================================
   faq.js — logic for faq.html only.
   Builds an accessible accordion: clicking a question toggles its answer.
   Only one answer stays open at a time.
   ========================================================================== */

const FAQ_ITEMS = [
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

document.addEventListener("DOMContentLoaded", renderFaqList);

function renderFaqList() {
  const list = document.getElementById("faqList");

  list.innerHTML = FAQ_ITEMS.map(
    (item, index) => `
    <div class="faq-item" id="faqItem-${index}">
      <button class="faq-question" data-index="${index}" aria-expanded="false">
        <span>${item.question}</span>
        <span class="faq-question__icon">+</span>
      </button>
      <div class="faq-answer">
        <p>${item.answer}</p>
      </div>
    </div>
  `
  ).join("");

  list.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => toggleFaqItem(Number(button.dataset.index)));
  });
}

function toggleFaqItem(clickedIndex) {
  document.querySelectorAll(".faq-item").forEach((item, index) => {
    const answer = item.querySelector(".faq-answer");
    const button = item.querySelector(".faq-question");
    const isClickedItem = index === clickedIndex;
    const isCurrentlyOpen = item.classList.contains("faq-item--open");

    // Only one FAQ item should be open at a time: close everything, then
    // re-open the clicked one only if it wasn't already open.
    const shouldOpen = isClickedItem && !isCurrentlyOpen;

    item.classList.toggle("faq-item--open", shouldOpen);
    button.setAttribute("aria-expanded", shouldOpen);
    answer.style.maxHeight = shouldOpen ? `${answer.scrollHeight}px` : "0px";
  });
}
