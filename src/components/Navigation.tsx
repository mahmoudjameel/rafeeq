import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Section */}
        <div className="nav-brand">
          <a href="#home" className="brand-link" onClick={closeMobileMenu}>
            <div className="brand-logo">
              <div className="logo-circle">
                <img src="/Test.jpeg" alt="rfeeq رفيق - ليس فقط للتقسيط!" className="logo-img" />
              </div>
              <div className="brand-text">
                <span className="brand-name">rfeeq</span>
                <span className="brand-tagline">رفيق للتقسيط</span>
              </div>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-menu desktop-menu">
          <div className="nav-items">
            <a href="#about" className="nav-item">
              <span className="nav-icon">🏢</span>
              <span className="nav-text">عن rfeeq</span>
            </a>
            <a href="#features" className="nav-item">
              <span className="nav-icon">✨</span>
              <span className="nav-text">المميزات</span>
            </a>
            <a href="#reviews" className="nav-item">
              <span className="nav-icon">⭐</span>
              <span className="nav-text">التقييمات</span>
            </a>
            <a href="#contact" className="nav-item">
              <span className="nav-icon">📞</span>
              <span className="nav-text">اتصل بنا</span>
            </a>
          </div>

          <div className="nav-actions">
            <a
              href="https://wa.me/966573755644?text=مرحباً، أريد معلومات عن تقسيط الأجهزة مع rfeeq رفيق للتقسيط"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              <span className="button-icon">🚀</span>
              <span className="button-text">ابدأ الآن</span>
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <a href="#about" className="mobile-nav-item" onClick={closeMobileMenu}>
              <span className="mobile-nav-icon">🏢</span>
              <span className="mobile-nav-text">عن rfeeq</span>
            </a>
            <a href="#features" className="mobile-nav-item" onClick={closeMobileMenu}>
              <span className="mobile-nav-icon">✨</span>
              <span className="mobile-nav-text">المميزات</span>
            </a>
            <a href="#reviews" className="mobile-nav-item" onClick={closeMobileMenu}>
              <span className="mobile-nav-icon">⭐</span>
              <span className="mobile-nav-text">التقييمات</span>
            </a>
            <a href="#contact" className="mobile-nav-item" onClick={closeMobileMenu}>
              <span className="mobile-nav-icon">📞</span>
              <span className="mobile-nav-text">اتصل بنا</span>
            </a>

            <a
              href="https://wa.me/966573755644?text=مرحباً، أريد معلومات عن تقسيط الأجهزة مع rfeeq رفيق للتقسيط"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-cta-button"
              onClick={closeMobileMenu}
            >
              <span className="mobile-button-icon">🚀</span>
              <span className="mobile-button-text">ابدأ الآن</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
