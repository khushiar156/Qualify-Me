import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import SchemeList from '../components/SchemeList';
import { SCHOLARSHIPS, QUALIFICATION_LEVELS, CATEGORY_OPTIONS } from '../data/scholarshipsData';

export default function SchemesPage({ savedSchemeIds, onToggleSave, onViewDetails }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState('all');
  const [selectedQual, setSelectedQual] = useState('all');
  const [selectedCat, setSelectedCat] = useState('all');

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveLevel('all');
    setSelectedQual('all');
    setSelectedCat('all');
  };

  const filteredSchemes = SCHOLARSHIPS.filter((scheme) => {
    // Keyword Search
    const term = searchQuery.trim().toLowerCase();
    const searchableText = `${scheme.name} ${scheme.provider} ${scheme.state || ''}`.toLowerCase();
    const matchesSearch = term === '' || searchableText.includes(term);

    // Level Filter
    const matchesLevel = activeLevel === 'all' || scheme.level === activeLevel;

    // Qualification Filter
    const matchesQual =
      selectedQual === 'all' || scheme.qualifications.includes(selectedQual);

    // Category Filter
    const matchesCat =
      selectedCat === 'all' ||
      scheme.categories.includes('any') ||
      scheme.categories.includes(selectedCat);

    return matchesSearch && matchesLevel && matchesQual && matchesCat;
  });

  return (
    <div>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Case File Directory</span>
          <h1>Explore Scholarships &amp; Schemes</h1>
          <p>Browse available opportunities and find one that fits your goals.</p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeLevel={activeLevel}
            onLevelChange={setActiveLevel}
            selectedQualification={selectedQual}
            onQualificationChange={setSelectedQual}
            selectedCategory={selectedCat}
            onCategoryChange={setSelectedCat}
            qualificationOptions={QUALIFICATION_LEVELS}
            categoryOptions={CATEGORY_OPTIONS.filter((c) => c.value !== 'any')}
          />

          <p className="form-hint" style={{ marginBottom: '20px' }}>
            {filteredSchemes.length} scheme{filteredSchemes.length === 1 ? '' : 's'} found
          </p>

          <SchemeList
            schemes={filteredSchemes}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={onToggleSave}
            onViewDetails={onViewDetails}
            emptyStateMessage={
              <div className="empty-state">
                <h2>No schemes match your search.</h2>
                <p>Try a different keyword or reset the filters.</p>
                <div className="empty-state__actions">
                  <button
                    type="button"
                    className="btn btn--outline-dark"
                    onClick={handleResetFilters}
                  >
                    Reset Filters
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
