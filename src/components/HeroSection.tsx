import React, { useState, useEffect } from 'react';
import { useWebsite } from '../context/WebsiteContext';

const HeroSection: React.FC = () => {
  const { websiteData, loading } = useWebsite();
  const [currentSlide, setCurrentSlide] = useState(0);

  // New modern features with emojis and better descriptions
  const features = websiteData.features || [
    {
      icon: '💳',
      title: 'تقسيط مرن',
      description: 'اختر المدة التي تناسبك من 6 إلى 36 شهر'
    },
    {
      icon: '⚡',
      title: 'موافقة سريعة',
      description: 'حصول على الموافقة خلال 5 دقائق فقط'
    },
    {
      icon: '🛡️',
      title: 'أمان مضمون',
      description: 'بياناتك محمية بأعلى معايير الأمان'
    },
    {
      icon: '📱',
      title: 'سهولة الاستخدام',
      description: 'طريقة بسيطة ومريحة لتقديم طلبك'
    }
  ];

  // Auto-rotating testimonials
  const testimonials = [
    "أفضل منصة تقسيط في السعودية!",
    "خدمة ممتازة وسريعة جداً",
    "أسعار منافسة ومرونة في السداد",
    "موظفين محترفين ومتفهمين"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="home" className="modern-hero-section">
      {/* Floating Background Elements */}
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="floating-shape shape-3"></div>

      <div className="container">
        <div className="hero-content">
          {/* Main Content */}
          <div className="hero-main">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-icon">🎉</span>
                <span className="badge-text">جديد! خدمة تقسيط متطورة</span>
              </div>

              <h1 className="hero-title">
                احصل على ما تريد
                <span className="title-highlight-white"> الآن</span>
                <br />
                وادفع
                <span className="title-highlight-white"> لاحقاً</span>
              </h1>

              <p className="hero-description">
                رفيقك المثالي في عالم التقسيط الذكي. نوفر لك أفضل الحلول المالية
                لتحقيق أحلامك بدون تعقيد أو إرهاق.
              </p>

              {/* Action Buttons */}
              <div className="hero-actions">
                <a
                  href="https://wa.me/966573755644?text=مرحباً، أريد معلومات عن تقسيط الأجهزة مع rfeeq رفيق للتقسيط"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button"
                >
                  <span className="button-icon">🚀</span>
                  <span className="button-text">ابدأ الآن</span>
                </a>

                <a href="#features" className="secondary-button">
                  <span className="button-icon">📋</span>
                  <span className="button-text">اعرف أكثر</span>
                </a>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">عميل راضي</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">معدل الموافقة</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">خدمة عملاء</span>
                </div>
              </div>
            </div>

            {/* Hero Logo */}
            <div className="hero-logo-section">
              <div className="hero-logo-wrapper">
                <img
                  src="/Test.jpeg"
                  alt="rfeeq رفيق للتقسيط - أفضل منصة تقسيط في السعودية"
                  className="hero-logo-img"
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          {/* Testimonials Ticker */}
          <div className="testimonials-ticker">
            <div className="ticker-content">
              <span className="ticker-label">يقول عملاؤنا:</span>
              <div className="ticker-text">
                {testimonials.map((testimonial, index) => (
                  <span
                    key={index}
                    className={`ticker-item ${index === currentSlide ? 'active' : ''}`}
                  >
                    {testimonial}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
