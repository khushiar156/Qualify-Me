import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import SchemeList from '../components/SchemeList';
import { SCHOLARSHIPS, matchScholarships, formatQualifications } from '../data/scholarshipsData';

export default function ResultsPage({
  userProfile,
  onNavigate,
  savedSchemeIds,
  onToggleSave,
  onViewDetails,
}) {
  const [activeLevel, setActiveLevel] = useState('all');
  const [sortValue, setSortValue] = useState('name-asc');

  if (!userProfile) {
    return (
      <section className="section--tight">
        <div className="container">
          <div className="empty-state">
            <h2>We don't have your details yet.</h2>
            <p>Fill out the eligibility form first so we know what to look for.</p>
            <div className="empty-state__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => onNavigate('eligibility')}
              >
                Check My Eligibility <span className="btn__arrow">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const rawMatches = matchScholarships(userProfile, SCHOLARSHIPS);

  let filteredMatches = rawMatches.filter((scheme) => {
    if (activeLevel === 'all') return true;
    return scheme.level === activeLevel;
  });

  filteredMatches = [...filteredMatches].sort((a, b) => {
    if (sortValue === 'name-asc') return a.name.localeCompare(b.name);
    if (sortValue === 'name-desc') return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div>
      <section className="results-header">
        <div className="container">
          <span className="eyebrow">Case File Result</span>
          <h1>Your Shortlist</h1>
          <p className="results-header__meta">
            <strong>{rawMatches.length}</strong> scheme{rawMatches.length === 1 ? '' : 's'} matched
            <br />
            Based on: Age {userProfile.age} &bull; {formatQualifications([userProfile.qualification])} &bull;{' '}
            {userProfile.state || 'Any state'}
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          {rawMatches.length > 0 ? (
            <>
              <FilterBar
                activeLevel={activeLevel}
                onLevelChange={setActiveLevel}
                sortValue={sortValue}
                onSortChange={setSortValue}
              />

              <SchemeList
                schemes={filteredMatches}
                savedSchemeIds={savedSchemeIds}
                onToggleSave={onToggleSave}
                onViewDetails={onViewDetails}
                emptyStateMessage={
                  <p className="form-hint">No schemes match this filter. Try selecting "All".</p>
                }
              />
            </>
          ) : (
            <div className="empty-state">
              <h2>No schemes matched your current details.</h2>
              <p>Try checking your qualification or state, or explore all available schemes.</p>
              <div className="empty-state__actions">
                <button
                  type="button"
                  className="btn btn--outline-dark"
                  onClick={() => onNavigate('eligibility')}
                >
                  Try Again
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => onNavigate('schemes')}
                >
                  Explore All Schemes
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
