import React, { useState, useEffect } from 'react';

export default function Hero({ onNavigate, schemeCount = 15 }) {
  const [displayedCount, setDisplayedCount] = useState(0);

  // Typewriter effect state
  const line1Text = "Find what you";
  const line2Text = "qualify for.";
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [activeLine, setActiveLine] = useState(1);

  // Counter up animation
  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.round(schemeCount / 20));
    const timer = setInterval(() => {
      current += step;
      if (current >= schemeCount) {
        current = schemeCount;
        clearInterval(timer);
      }
      setDisplayedCount(current);
    }, 40);
    return () => clearInterval(timer);
  }, [schemeCount]);

  // Typewriter effect logic
  useEffect(() => {
    let charIdx = 0;
    const speed = 70;

    const timer1 = setInterval(() => {
      if (charIdx <= line1Text.length) {
        setTypedLine1(line1Text.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(timer1);
        setActiveLine(2);
        let charIdx2 = 0;
        const timer2 = setInterval(() => {
          if (charIdx2 <= line2Text.length) {
            setTypedLine2(line2Text.slice(0, charIdx2));
            charIdx2++;
          } else {
            clearInterval(timer2);
            setActiveLine(0); // Finished
          }
        }, speed);
      }
    }, speed);

    return () => clearInterval(timer1);
  }, []);

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div>
          <span className="hero__eyebrow">Qualify Me &middot; Case File System</span>
          <h1 className="hero__title">
            <span className={`hero__title-line ${activeLine === 1 ? 'hero__title-line--typing' : ''}`}>
              {typedLine1}
            </span>
            <span className={`hero__title-line ${activeLine === 2 ? 'hero__title-line--typing' : ''}`}>
              {typedLine2}
            </span>
          </h1>
          <p className="hero__sub">
            Discover scholarships and government schemes that match your age,
            education, category and state — without digging through a dozen
            different websites.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn btn--primary" onClick={() => onNavigate('eligibility')}>
              Check My Eligibility <span className="btn__arrow">&rarr;</span>
            </button>
            <button type="button" className="btn btn--secondary" onClick={() => onNavigate('schemes')}>
              Explore Schemes <span className="btn__arrow">&rarr;</span>
            </button>
          </div>
          <p className="hero__tagline">Your eligibility. Your opportunities. One place.</p>
        </div>

        {/* Case File visual */}
        <div className="case-file">
          <div className="case-file__layer"></div>
          <div className="case-file__layer case-file__layer--2"></div>
          <div className="case-file__card">
            <div className="case-file__row">
              <span>Form QM-01</span>
              <span>Case No. QM-2026</span>
            </div>
            <h3 className="case-file__title">Qualify Me<br />Scholarship Check</h3>
            <hr className="case-file__divider" />
            <div className="case-file__field">
              <span className="label">Eligibility status</span>
              <span className="case-file__value">Ready</span>
            </div>
            <div className="case-file__field">
              <span className="label">Schemes found</span>
              <span className="case-file__value">{String(displayedCount).padStart(2, '0')}</span>
            </div>
            <div className="case-file__stamp">&#10003; Verified</div>
          </div>
        </div>
      </div>
    </section>
  );
}
