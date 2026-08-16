import React from 'react';

export default function HowItWorksPage({ onNavigate }) {
  return (
    <div>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Behind the Case File</span>
          <h1>How Qualify Me Works</h1>
          <p>No accounts, no backend — just a straightforward comparison between your profile and each scheme's real eligibility conditions.</p>
        </div>
      </section>

      <section className="section--paper">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">The four steps</span>
            <h2>From your details to a shortlist</h2>
          </div>
          <div className="steps">
            <div className="step-card">
              <span className="step-card__number">01</span>
              <h3>Enter your details</h3>
              <p>You fill in your age, qualification, category and state on the eligibility form.</p>
            </div>
            <div className="step-card">
              <span className="step-card__number">02</span>
              <h3>We compare your profile</h3>
              <p>Your answers are checked against the conditions stored for every scheme.</p>
            </div>
            <div className="step-card">
              <span className="step-card__number">03</span>
              <h3>Matching schemes are shortlisted</h3>
              <p>Only the schemes that pass every check are added to your results.</p>
            </div>
            <div className="step-card">
              <span className="step-card__number">04</span>
              <h3>You verify and apply</h3>
              <p>You confirm the details on the scheme's official portal, then apply there directly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">The matching logic</span>
            <h2>What actually gets checked</h2>
            <p>A scheme is only shown when every one of these conditions passes — this is exactly what the <code>matchScholarships()</code> function does in the code.</p>
          </div>

          <div className="flow-diagram">
            <div className="flow-diagram__node">Age</div>
            <div className="flow-diagram__arrow">&darr;</div>
            <div className="flow-diagram__node">Qualification</div>
            <div className="flow-diagram__arrow">&darr;</div>
            <div className="flow-diagram__node">Category</div>
            <div className="flow-diagram__arrow">&darr;</div>
            <div className="flow-diagram__node">State</div>
            <div className="flow-diagram__arrow">&darr;</div>
            <div className="flow-diagram__node flow-diagram__node--result">Eligible Schemes</div>
          </div>
        </div>
      </section>

      <section className="section--paper">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Central vs. state</span>
            <h2>Why some schemes ignore your state</h2>
          </div>
          <div className="rule-columns">
            <div className="detail-block">
              <h3>Central Schemes</h3>
              <p>Central schemes are run by national ministries and departments, so they're checked regardless of the state you selected — as long as your age, qualification and category match.</p>
            </div>
            <div className="detail-block">
              <h3>State Schemes</h3>
              <p>State schemes are only available to residents of that specific state. They're checked against the state you selected on the eligibility form — if you skip that field, state schemes won't appear in your results.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <span className="eyebrow">Ready to try it?</span>
        <h2>Check your eligibility now</h2>
        <p>It takes less than a minute.</p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => onNavigate('eligibility')}
        >
          Check My Eligibility <span className="btn__arrow">&rarr;</span>
        </button>
      </section>
    </div>
  );
}
