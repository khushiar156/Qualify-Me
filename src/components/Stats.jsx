import React from 'react';
import { SCHOLARSHIPS, QUALIFICATION_LEVELS } from '../data/scholarshipsData';

export default function Stats() {
  const uniqueStates = new Set(
    SCHOLARSHIPS.filter((scheme) => scheme.state).map((scheme) => scheme.state)
  );

  const stats = [
    { number: `${SCHOLARSHIPS.length}+`, label: 'Schemes Listed' },
    { number: uniqueStates.size, label: 'States Covered' },
    { number: QUALIFICATION_LEVELS.length, label: 'Qualification Levels' },
  ];

  return (
    <section className="section--paper">
      <div className="container stats">
        {stats.map((stat, idx) => (
          <div key={idx} className="stats__item">
            <span className="stats__number">{stat.number}</span>
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
