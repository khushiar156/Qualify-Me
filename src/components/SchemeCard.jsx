import React, { useState } from 'react';
import { formatQualifications } from '../data/scholarshipsData';

export default function SchemeCard({
  scheme,
  isSaved,
  onToggleSave,
  onViewDetails,
  showSave = true,
  isRemoveButton = false,
}) {
  const [isPulsing, setIsPulsing] = useState(false);

  const levelLabel = scheme.level === 'central' ? 'CENTRAL' : 'STATE';

  const handleSaveClick = () => {
    setIsPulsing(true);
    onToggleSave(scheme.id);
    setTimeout(() => setIsPulsing(false), 300);
  };

  return (
    <article className="scheme-card">
      <div className="scheme-card__top">
        <span className={`stamp stamp--${scheme.level}`}>{levelLabel}</span>
        {scheme.state && <span className="scheme-card__state">{scheme.state}</span>}
      </div>

      <h3 className="scheme-card__name">{scheme.name}</h3>
      <p className="scheme-card__provider">{scheme.provider}</p>

      <dl className="scheme-card__facts">
        <div>
          <dt>Benefit</dt>
          <dd>{scheme.amount}</dd>
        </div>
        <div>
          <dt>Income ceiling</dt>
          <dd>{scheme.incomeCeiling}</dd>
        </div>
        <div>
          <dt>Eligible stage</dt>
          <dd>{formatQualifications(scheme.qualifications)}</dd>
        </div>
      </dl>

      <div className="scheme-card__actions">
        <button
          type="button"
          className="btn btn--small btn--primary"
          onClick={() => onViewDetails(scheme.id)}
        >
          View Details <span className="btn__arrow">&rarr;</span>
        </button>

        {showSave && !isRemoveButton && (
          <button
            type="button"
            className={`btn btn--small btn--ghost save-btn ${isPulsing ? 'save-btn--pulse' : ''}`}
            onClick={handleSaveClick}
            aria-pressed={isSaved}
          >
            {isSaved ? 'Saved \u2713' : '\u9825 Save'}
          </button>
        )}

        {isRemoveButton && (
          <button
            type="button"
            className="btn btn--small btn--outline-dark"
            onClick={() => onToggleSave(scheme.id)}
          >
            Remove
          </button>
        )}
      </div>
    </article>
  );
}
