import React, { useState } from 'react';
import { getSchemeById, formatQualifications, CATEGORY_OPTIONS } from '../data/scholarshipsData';

export default function SchemeDetailsPage({
  schemeId,
  onNavigate,
  savedSchemeIds,
  onToggleSave,
}) {
  const [isPulsing, setIsPulsing] = useState(false);
  const scheme = getSchemeById(schemeId);

  if (!scheme) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h2>Scheme not found.</h2>
          <p>The scheme you're looking for doesn't exist or may have been removed from the case file.</p>
          <div className="empty-state__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => onNavigate('schemes')}
            >
              Back to Explore Schemes
            </button>
          </div>
        </div>
      </section>
    );
  }

  const isSaved = savedSchemeIds.includes(scheme.id);

  const handleSaveToggle = () => {
    setIsPulsing(true);
    onToggleSave(scheme.id);
    setTimeout(() => setIsPulsing(false), 300);
  };

  const formattedDate = new Date(scheme.verifiedOn).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const categoryLabels = scheme.categories.includes('any')
    ? 'Open to all categories'
    : scheme.categories
        .map((catVal) => {
          const found = CATEGORY_OPTIONS.find((c) => c.value === catVal);
          return found ? found.label : catVal;
        })
        .join(', ');

  return (
    <div>
      <section className="detail-header">
        <div className="container">
          <span className={`stamp stamp--${scheme.level}`}>
            {scheme.level === 'central' ? 'CENTRAL SCHEME' : 'STATE SCHEME'}
          </span>
          <h1>{scheme.name}</h1>
          <p>{scheme.provider}{scheme.state ? ` \u00b7 ${scheme.state}` : ''}</p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container detail-layout">
          <div className="detail-main">
            <div className="detail-block">
              <h2>About</h2>
              <p>{scheme.about}</p>
            </div>

            <div className="detail-block">
              <h2>Benefit</h2>
              <span className="benefit-highlight">{scheme.amount}</span>
            </div>

            <div className="detail-block">
              <h2>Eligibility</h2>
              <dl className="eligibility-list">
                <div>
                  <dt>Age</dt>
                  <dd>{scheme.minAge}&ndash;{scheme.maxAge} years</dd>
                </div>
                <div>
                  <dt>Qualification</dt>
                  <dd>{formatQualifications(scheme.qualifications)}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{categoryLabels}</dd>
                </div>
                <div>
                  <dt>Family Income</dt>
                  <dd>{scheme.incomeCeiling}</dd>
                </div>
              </dl>
              <p className="form-hint" style={{ marginTop: '14px' }}>
                {scheme.level === 'central'
                  ? 'This is a central scheme — it is checked regardless of state.'
                  : `This is a state scheme — only available to applicants in ${scheme.state}.`}
              </p>
            </div>

            {scheme.notes && (
              <div className="detail-block">
                <h2>Important Notes</h2>
                <p>{scheme.notes}</p>
              </div>
            )}
          </div>

          <div className="detail-sidebar">
            <div className="detail-block">
              <span className="label">Official Portal</span>
              <p className="form-hint" style={{ margin: '6px 0 14px' }}>
                Always confirm current details before applying.
              </p>
              <a
                href={scheme.portal}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--full"
              >
                Apply / Read Notification <span className="btn__arrow">&rarr;</span>
              </a>
            </div>

            <div className="detail-block">
              <span className="label">Verification</span>
              <p className="verification-box" style={{ marginTop: '8px' }}>
                Last checked: {formattedDate}
              </p>
            </div>

            <div className="detail-block">
              <button
                type="button"
                className={`btn btn--ghost btn--full ${isPulsing ? 'save-btn--pulse' : ''}`}
                onClick={handleSaveToggle}
                aria-pressed={isSaved}
              >
                {isSaved ? 'Saved \u2713' : '\u9825 Save Scheme'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
