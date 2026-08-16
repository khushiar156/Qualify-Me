import React from 'react';
import SchemeCard from './SchemeCard';

export default function SchemeList({
  schemes = [],
  savedSchemeIds = [],
  onToggleSave,
  onViewDetails,
  emptyStateMessage = null,
  isRemoveButton = false,
}) {
  if (schemes.length === 0) {
    return emptyStateMessage || <p className="form-hint">No schemes found.</p>;
  }

  return (
    <div className="scheme-grid">
      {schemes.map((scheme) => {
        const isSaved = savedSchemeIds.includes(scheme.id);
        return (
          <SchemeCard
            key={scheme.id}
            scheme={scheme}
            isSaved={isSaved}
            onToggleSave={onToggleSave}
            onViewDetails={onViewDetails}
            isRemoveButton={isRemoveButton}
          />
        );
      })}
    </div>
  );
}
