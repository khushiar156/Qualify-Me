import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import EligibilityPage from './pages/EligibilityPage';
import ResultsPage from './pages/ResultsPage';
import SchemesPage from './pages/SchemesPage';
import SchemeDetailsPage from './pages/SchemeDetailsPage';
import SavedPage from './pages/SavedPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FaqPage from './pages/FaqPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

const SAVED_SCHEMES_KEY = 'qualifyMeSaved';
const PROFILE_SESSION_KEY = 'qualifyMeProfile';
const CURRENT_USER_KEY = 'qualifyMeCurrentUser';

export default function App() {
  // Page Routing State
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSchemeId, setSelectedSchemeId] = useState(null);

  // Logged-in User State (localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      return null;
    }
  });

  // User Eligibility Profile State (sessionStorage)
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const stored = sessionStorage.getItem(PROFILE_SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      return null;
    }
  });

  // Saved Schemes State (localStorage)
  const [savedSchemeIds, setSavedSchemeIds] = useState(() => {
    try {
      const stored = localStorage.getItem(SAVED_SCHEMES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      return [];
    }
  });

  // Sync currentUser to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (err) {
      console.error('Failed to sync currentUser to localStorage', err);
    }
  }, [currentUser]);

  // Sync saved items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_SCHEMES_KEY, JSON.stringify(savedSchemeIds));
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }
  }, [savedSchemeIds]);

  // Sync profile to sessionStorage
  useEffect(() => {
    try {
      if (userProfile) {
        sessionStorage.setItem(PROFILE_SESSION_KEY, JSON.stringify(userProfile));
      }
    } catch (err) {
      console.error('Failed to save to sessionStorage', err);
    }
  }, [userProfile]);

  // Page navigation handler with automatic scroll-to-top
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login success handler
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    handleNavigate('home');
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    handleNavigate('home');
  };

  // View scheme details
  const handleViewDetails = (schemeId) => {
    setSelectedSchemeId(schemeId);
    handleNavigate('scheme-details');
  };

  // Submit eligibility form profile
  const handleSubmitProfile = (profile) => {
    setUserProfile(profile);
    handleNavigate('results');
  };

  // Save / remove scheme toggle
  const handleToggleSave = (schemeId) => {
    setSavedSchemeIds((prev) =>
      prev.includes(schemeId) ? prev.filter((id) => id !== schemeId) : [...prev, schemeId]
    );
  };

  // Render current page view based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
          />
        );
      case 'eligibility':
        return (
          <EligibilityPage
            userProfile={userProfile}
            onSubmitProfile={handleSubmitProfile}
          />
        );
      case 'results':
        return (
          <ResultsPage
            userProfile={userProfile}
            onNavigate={handleNavigate}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
          />
        );
      case 'schemes':
        return (
          <SchemesPage
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
          />
        );
      case 'scheme-details':
        return (
          <SchemeDetailsPage
            schemeId={selectedSchemeId}
            onNavigate={handleNavigate}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSave}
          />
        );
      case 'saved':
        return (
          <SavedPage
            savedSchemeIds={savedSchemeIds}
            onNavigate={handleNavigate}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
            currentUser={currentUser}
          />
        );
      case 'login':
        return (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
          />
        );
      case 'how-it-works':
        return <HowItWorksPage onNavigate={handleNavigate} />;
      case 'faq':
        return <FaqPage />;
      case 'about':
        return <AboutPage />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
          />
        );
    }
  };

  return (
    <div>
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        savedCount={currentUser ? savedSchemeIds.length : 0}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}
