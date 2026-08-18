import React, { useState } from 'react';

const USERS_STORAGE_KEY = 'qualifyMeUsers';

export default function LoginPage({ onLoginSuccess, onNavigate, initialMode = 'login' }) {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');

  // Form Fields State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // General Error State
  const [errorMessage, setErrorMessage] = useState('');

  // Helper to read users from localStorage
  const getUsers = () => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to read users from localStorage', err);
      return [];
    }
  };

  // Helper to save users to localStorage
  const saveUsers = (users) => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (err) {
      console.error('Failed to save users to localStorage', err);
    }
  };

  // Email format validation
  const isValidEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  // Switch between Login and Sign Up views
  const handleToggleMode = () => {
    setIsSignUp((prev) => !prev);
    setErrorMessage('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();

    if (isSignUp) {
      // Sign Up Validation
      if (!name.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!trimmedEmail) {
        setErrorMessage('Please enter your email address.');
        return;
      }
      if (!isValidEmail(trimmedEmail)) {
        setErrorMessage('Please enter a valid email address (e.g. user@example.com).');
        return;
      }
      if (!password) {
        setErrorMessage('Please enter a password.');
        return;
      }
      if (password.length < 4) {
        setErrorMessage('Password must be at least 4 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Password and Confirm Password do not match.');
        return;
      }

      // Check if user already exists
      const existingUsers = getUsers();
      const userExists = existingUsers.some(
        (u) => u.email && u.email.toLowerCase() === trimmedEmail.toLowerCase()
      );

      if (userExists) {
        setErrorMessage('An account with this email address already exists. Please log in.');
        return;
      }

      // Create new user object
      const newUser = {
        id: 'user_' + Date.now(),
        name: name.trim(),
        email: trimmedEmail.toLowerCase(),
        password: password,
        savedSchemeIds: [],
      };

      const updatedUsers = [...existingUsers, newUser];
      saveUsers(updatedUsers);

      // Trigger login callback
      onLoginSuccess(newUser);
    } else {
      // Log In Validation
      if (!trimmedEmail) {
        setErrorMessage('Please enter your email address.');
        return;
      }
      if (!password) {
        setErrorMessage('Please enter your password.');
        return;
      }

      const existingUsers = getUsers();
      const foundUser = existingUsers.find(
        (u) =>
          u.email &&
          u.email.toLowerCase() === trimmedEmail.toLowerCase() &&
          u.password === password
      );

      if (!foundUser) {
        setErrorMessage('Invalid email or password. Please check your details or sign up.');
        return;
      }

      // Trigger login callback
      onLoginSuccess(foundUser);
    }
  };

  return (
    <div>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">{isSignUp ? 'New Registration' : 'Student Portal'}</span>
          <h1>{isSignUp ? 'Create an Account' : 'Log In to Qualify Me'}</h1>
          <p>
            {isSignUp
              ? 'Register to save scholarship opportunities and manage your profile.'
              : 'Log in to access your saved scholarships and personal shortlist.'}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container auth-container">
          <form className="form-card auth-card" onSubmit={handleSubmit} noValidate>
            {errorMessage && (
              <div className="auth-alert-error" role="alert">
                <span className="auth-alert-icon">&#9888;</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {isSignUp && (
              <div className="form-field">
                <label htmlFor="auth-name">Full Name</label>
                <input
                  type="text"
                  id="auth-name"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-field">
              <label htmlFor="auth-email">Email Address</label>
              <input
                type="email"
                id="auth-email"
                placeholder="e.g. priya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="auth-password">Password</label>
              <input
                type="password"
                id="auth-password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isSignUp && (
              <div className="form-field">
                <label htmlFor="auth-confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="auth-confirm-password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-actions" style={{ marginTop: '24px' }}>
              <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                {isSignUp ? 'Create Account' : 'Log In'} <span className="btn__arrow">&rarr;</span>
              </button>
            </div>

            <div className="auth-toggle-box">
              <p className="auth-toggle-text">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  className="auth-toggle-btn"
                  onClick={handleToggleMode}
                >
                  {isSignUp ? 'Log In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
