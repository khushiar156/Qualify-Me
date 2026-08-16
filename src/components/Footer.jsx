import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__mark">&#9673;</span> QUALIFY ME
          <p>Scholarships &amp; Government Schemes</p>
        </div>
        <p className="site-footer__text">
          An informational student project designed to simplify scholarship discovery.
          Always verify eligibility, deadlines, amounts and application requirements
          on the official portal before applying.
        </p>
        <p className="site-footer__copy">&copy; 2026 Qualify Me. Built as a college frontend project.</p>
      </div>
    </footer>
  );
}
