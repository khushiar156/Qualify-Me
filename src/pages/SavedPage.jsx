import React from 'react';
import SchemeList from '../components/SchemeList';
import { getSchemeById } from '../data/scholarshipsData';

export default function SavedPage({
  savedSchemeIds = [],
  onNavigate,
  onToggleSave,
  onViewDetails,
}) {
  const savedSchemes = savedSchemeIds
    .map((id) => getSchemeById(id))
    .filter(Boolean);

  return (
    <div>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Your Case File</span>
          <h1>Saved Schemes</h1>
          <p>Scholarships and schemes you've saved to come back to later.</p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <SchemeList
            schemes={savedSchemes}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={onToggleSave}
            onViewDetails={onViewDetails}
            isRemoveButton={true}
            emptyStateMessage={
              <div className="empty-state">
                <h2>No saved schemes yet.</h2>
                <p>Explore scholarships and save the ones you want to come back to.</p>
                <div className="empty-state__actions">
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => onNavigate('schemes')}
                  >
                    Explore Schemes <span className="btn__arrow">&rarr;</span>
                  </button>
                </div>
              </div>
            }
          />
        </div>
      </section>
    </div>
  );
}
