import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import SchemeList from '../components/SchemeList';
import { SCHOLARSHIPS } from '../data/scholarshipsData';

export default function HomePage({ onNavigate, savedSchemeIds, onToggleSave, onViewDetails }) {
  // Take first 4 schemes for featured section
  const featuredSchemes = SCHOLARSHIPS.slice(0, 4);

  return (
    <div>
      <Hero onNavigate={onNavigate} schemeCount={SCHOLARSHIPS.length} />

      <Stats />

      {/* Process Preview */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">The process</span>
            <h2>Four steps to your shortlist</h2>
            <p>Qualify Me checks your details against every scheme's real eligibility conditions — no guesswork.</p>
          </div>
          <div className="steps">
            <div className="step-card">
              <span className="step-card__number">01</span>
              <h3>Enter your details</h3>
              <p>Age, qualification, category and state — that's all we ask for.</p>
            </div>
            <div className="step-card">
              <span className="step-card__number">02</span>
              <h3>We check the criteria</h3>
              <p>Your profile is compared against every scheme's actual conditions.</p>
            </div>
            <div className="step-card">
              <span className="step-card__number">03</span>
              <h3>Get your shortlist</h3>
              <p>Only schemes you're eligible for are shown — nothing else.</p>
            </div>
            <div className="step-card">
              <span className="step-card__number">04</span>
              <h3>Verify &amp; apply</h3>
              <p>Confirm the details on the official portal, then apply directly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="section--paper">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">A sample of what's inside</span>
            <h2>Featured schemes</h2>
            <p>A few of the scholarships currently in the Qualify Me case file.</p>
          </div>
          <SchemeList
            schemes={featuredSchemes}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={onToggleSave}
            onViewDetails={onViewDetails}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <span className="eyebrow">Not sure where to start?</span>
        <h2>Let Qualify Me find opportunities that match your profile.</h2>
        <p>It takes less than a minute — no account, no signup, just your details.</p>
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
