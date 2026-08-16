import React from 'react';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  activeLevel = 'all',
  onLevelChange,
  selectedQualification,
  onQualificationChange,
  selectedCategory,
  onCategoryChange,
  sortValue,
  onSortChange,
  qualificationOptions,
  categoryOptions,
}) {
  return (
    <div className="filter-bar">
      {onSearchChange !== undefined && (
        <div className="search-box">
          <span className="label">Search</span>
          <input
            type="text"
            placeholder="Search schemes by name, provider or state..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}

      {onLevelChange && (
        <div className="filter-group">
          <span className="label">Level</span>
          <div className="pill-group">
            {['all', 'central', 'state'].map((level) => (
              <button
                key={level}
                type="button"
                className={`pill ${activeLevel === level ? 'pill--active' : ''}`}
                onClick={() => onLevelChange(level)}
              >
                {level === 'all' ? 'All' : level === 'central' ? 'Central' : 'State'}
              </button>
            ))}
          </div>
        </div>
      )}

      {onQualificationChange && qualificationOptions && (
        <div className="filter-group">
          <span className="label">Qualification</span>
          <select
            value={selectedQualification || 'all'}
            onChange={(e) => onQualificationChange(e.target.value)}
          >
            <option value="all">All</option>
            {qualificationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {onCategoryChange && categoryOptions && (
        <div className="filter-group">
          <span className="label">Category</span>
          <select
            value={selectedCategory || 'all'}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">All</option>
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {onSortChange && (
        <div className="filter-group">
          <span className="label">Sort by</span>
          <select
            value={sortValue || 'name-asc'}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
          </select>
        </div>
      )}
    </div>
  );
}
