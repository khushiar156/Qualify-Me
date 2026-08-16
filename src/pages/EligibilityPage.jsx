import React, { useState } from 'react';
import { QUALIFICATION_LEVELS, CATEGORY_OPTIONS, STATE_OPTIONS } from '../data/scholarshipsData';

export default function EligibilityPage({ userProfile, onSubmitProfile }) {
  const [age, setAge] = useState(userProfile ? userProfile.age : '');
  const [qualification, setQualification] = useState(userProfile ? userProfile.qualification : '');
  const [category, setCategory] = useState(userProfile ? userProfile.category : '');
  const [state, setState] = useState(userProfile ? userProfile.state : '');

  const [errors, setErrors] = useState({
    age: false,
    qualification: false,
    category: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const ageNum = Number(age);
    const ageValid = ageNum >= 1 && ageNum <= 100;
    const qualValid = qualification !== '';
    const catValid = category !== '';

    setErrors({
      age: !ageValid,
      qualification: !qualValid,
      category: !catValid,
    });

    if (!ageValid || !qualValid || !catValid) {
      return;
    }

    const profile = {
      age: ageNum,
      qualification,
      category,
      state,
    };

    onSubmitProfile(profile);
  };

  const handleClear = () => {
    setAge('');
    setQualification('');
    setCategory('');
    setState('');
    setErrors({ age: false, qualification: false, category: false });
  };

  return (
    <div>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Form QM-01</span>
          <h1>Check Your Eligibility</h1>
          <p>Tell us a little about yourself and we'll find schemes that match your profile.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="form-card" onSubmit={handleSubmit} noValidate>
            {/* Age Field */}
            <div className={`form-field ${errors.age ? 'form-field--invalid' : ''}`}>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                min="1"
                max="100"
                placeholder="e.g. 20"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <p className="form-error">Please enter a valid age between 1 and 100.</p>
            </div>

            {/* Qualification Field */}
            <div className={`form-field ${errors.qualification ? 'form-field--invalid' : ''}`}>
              <label htmlFor="qualification">Current / Highest Qualification</label>
              <select
                id="qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                required
              >
                <option value="" disabled>Select your qualification</option>
                {QUALIFICATION_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              <p className="form-error">Please select your qualification.</p>
            </div>

            {/* Category Field */}
            <div className={`form-field ${errors.category ? 'form-field--invalid' : ''}`}>
              <label htmlFor="category">Social Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select your category</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <p className="form-error">Please select a category.</p>
            </div>

            {/* State Field */}
            <div className="form-field">
              <label htmlFor="state">State</label>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Not sure / Skip</option>
                {STATE_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <p className="form-hint">
                Central schemes will still be shown even if you skip this. State schemes only match your selected state.
              </p>
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button type="submit" className="btn btn--primary">
                Check Eligibility <span className="btn__arrow">&rarr;</span>
              </button>
              <button type="button" className="btn btn--outline-dark" onClick={handleClear}>
                Clear
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
