import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/scholarshipsData';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Frequently Asked</span>
          <h1>Questions &amp; Answers</h1>
          <p>Everything you might want to know before using Qualify Me.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div id="faqList">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <span className="faq-question__icon">+</span>
                  </button>
                  <div
                    className="faq-answer"
                    style={{
                      maxHeight: isOpen ? '200px' : '0px',
                      transition: 'max-height 0.25s ease',
                    }}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
