import React from 'react';

export default function AboutPage() {
  return (
    <div>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Project Background</span>
          <h1>About Qualify Me</h1>
          <p>Finding scholarships often requires students to search through multiple portals and understand different eligibility conditions. Qualify Me simplifies that discovery process.</p>
        </div>
      </section>

      <section className="section--paper">
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2>What the project does</h2>
          <p>Qualify Me matches your age, qualification, category and state against a dataset of scholarships and government schemes, and shows you only the ones you're eligible for — instead of making you read through every scheme's fine print yourself.</p>

          <ul className="feature-list" style={{ marginTop: '24px' }}>
            <li>Eligibility matching</li>
            <li>Central &amp; state schemes</li>
            <li>Qualification filtering</li>
            <li>Category filtering</li>
            <li>State filtering</li>
            <li>Scheme search &amp; browsing</li>
            <li>Detailed scheme pages</li>
            <li>Saved schemes</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2>Technology used</h2>
          <p>Built with core web standards and modern React component architecture.</p>
          <div className="tech-tags">
            <span>React 18</span>
            <span>JSX</span>
            <span>Functional Components</span>
            <span>useState</span>
            <span>CSS3</span>
            <span>Vite</span>
            <span>localStorage</span>
            <span>sessionStorage</span>
          </div>
        </div>
      </section>

      <section className="section--paper">
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2>Important disclaimer</h2>
          <div className="disclaimer-box">
            <p><strong>Qualify Me is a student/informational project and is not an official government portal.</strong></p>
            <p style={{ marginBottom: 0 }}>Scholarship amounts, eligibility requirements, deadlines and application procedures can change. Always verify the latest information — including eligibility, scholarship amount, deadlines, required documents and the application process — through the relevant official government portal before applying.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
