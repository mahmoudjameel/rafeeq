import React, { useState, useEffect } from 'react';
import { useWebsite } from '../context/WebsiteContext';

const BannerSection: React.FC = () => {
  const { websiteData } = useWebsite();
  const [currentOffer, setCurrentOffer] = useState(0);

  const offers = [
    {
      icon: '💳',
      title: 'تقسيط مرن',
      description: 'اختر المدة التي تناسبك من 6 إلى 36 شهر',
      color: '#007bff'
    },
    {
      icon: '⚡',
      title: 'موافقة سريعة',
      description: 'حصول على الموافقة خلال 5 دقائق فقط',
      color: '#28a745'
    },
    {
      icon: '🛡️',
      title: 'أمان مضمون',
      description: 'بياناتك محمية بأعلى معايير الأمان',
      color: '#ffc107'
    },
    {
      icon: '📱',
      title: 'سهولة الاستخدام',
      description: '',
      color: '#6c757d'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <section id="features" className="modern-banner-section">
      <div className="container">
        <div className="banner-content">
          {/* Header */}
          <div className="banner-header">
            <div className="banner-badge">
              <span className="badge-icon">🎯</span>
              <span className="badge-text">عروض حصرية</span>
            </div>

            <h2 className="banner-title" style={{ color: '#333', fontWeight: 'bold' }}>
              لا تفوت الفرصة!
              <br />
              <span className="title-highlight" style={{ color: '#8B0000' }}>احصل على أفضل العروض الآن</span>
            </h2>

            <p className="banner-description" style={{ color: '#555' }}>
              انضم إلى آلاف العملاء الراضين واستمتع بخدمات تقسيط مميزة
              مع عروض وهدايا حصرية.
            </p>
          </div>

          {/* Features Grid */}
          <div className="features-showcase">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`feature-card ${index === currentOffer ? 'active' : ''}`}
                style={{ '--offer-color': offer.color } as React.CSSProperties}
              >
                <div className="feature-icon" style={{ fontSize: '2.5rem', color: offer.color }}>{offer.icon}</div>
                <h3 className="feature-title" style={{ fontWeight: 'bold', color: '#333' }}>{offer.title}</h3>
                <p className="feature-description" style={{ color: '#666' }}>{offer.description}</p>
                {index === currentOffer && (
                  <div className="feature-glow" style={{ boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}></div>
                )}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="banner-stats" style={{ marginTop: '20px' }}>
            <div className="stat-item" style={{ textAlign: 'center' }}>
              <div className="stat-number" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000' }}>50,000+</div>
              <div className="stat-label" style={{ fontSize: '1rem', color: '#333' }}>عميل راضٍ</div>
            </div>
            <div className="stat-item" style={{ textAlign: 'center' }}>
              <div className="stat-number" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000' }}>99%</div>
              <div className="stat-label" style={{ fontSize: '1rem', color: '#333' }}>معدل الموافقة</div>
            </div>
            <div className="stat-item" style={{ textAlign: 'center' }}>
              <div className="stat-number" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000' }}>24/7</div>
              <div className="stat-label" style={{ fontSize: '1rem', color: '#333' }}>خدمة عملاء</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="banner-cta">
            <div className="cta-content">
              <h3 className="cta-title" style={{ color: '#333', fontWeight: 'bold' }}>هل أنت مستعد؟</h3>
              <p className="cta-description" style={{ color: '#555' }}>
                انضم إلينا الآن واستمتع بجميع المزايا والعروض.
              </p>

              <div className="cta-buttons">
                <a
                  href={`https://wa.me/${websiteData.whatsappNumber?.replace('+', '') || '966573755644'}?text=مرحباً، أريد معلومات عن خدمات rfeeq رفيق - ليس فقط للتقسيط!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-cta-button"
                  style={{ backgroundColor: '#8B0000', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}
                >
                  <span className="button-icon">🚀</span>
                  <span className="button-text">ابدأ الآن</span>
                </a>

                <a
                  href="#about"
                  className="secondary-cta-button"
                  style={{ backgroundColor: '#f5f5f5', color: '#333', padding: '10px 20px', borderRadius: '5px', border: '1px solid #ddd' }}
                >
                  <span className="button-icon">📞</span>
                  <span className="button-text">تواصل معنا</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
