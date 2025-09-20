import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const Footer: React.FC = () => {
  const { websiteData } = useWebsite();

  // Use data from context or fallback to defaults
  const socialMediaPlatforms = websiteData.socialMedia?.platforms?.filter(platform => platform.status === 'active') || [
    { name: 'whatsapp', icon: 'fab fa-whatsapp', text: 'واتساب', link: 'https://wa.me/966533388675' },
    { name: 'twitter', icon: 'fab fa-twitter', text: 'تويتر', link: 'https://twitter.com/rfeeq_sa' },
    { name: 'instagram', icon: 'fab fa-instagram', text: 'انستغرام', link: 'https://instagram.com/rfeeq_sa' },
    { name: 'snapchat', icon: 'fab fa-snapchat', text: 'سناب شات', link: 'https://snapchat.com/add/rfeeq_sa' },
    { name: 'facebook', icon: 'fab fa-facebook', text: 'فيسبوك', link: 'https://facebook.com/rfeeq.sa' },
    { name: 'youtube', icon: 'fab fa-youtube', text: 'يوتيوب', link: 'https://youtube.com/@rfeeq_sa' },
    { name: 'linkedin', icon: 'fab fa-linkedin', text: 'لينكد إن', link: 'https://linkedin.com/company/rfeeq-sa' },
    { name: 'tiktok', icon: 'fab fa-tiktok', text: 'تيك توك', link: 'https://tiktok.com/@rfeeq_sa' },
    { name: 'telegram', icon: 'fab fa-telegram', text: 'تليجرام', link: 'https://t.me/rfeeq_sa' }
  ];

  return (
    <footer id="contact" className="modern-footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main-content">
          {/* Brand Section */}
          <div className="footer-brand-section">
            <div className="footer-logo-container">
              <div className="footer-logo-circle">
                <img src="Test.jpeg" alt="rfeeq رفيق للتقسيط" className="footer-logo-img" />
              </div>
              <div className="footer-brand-info">
                <h3 className="footer-brand-name">rfeeq</h3>
                <p className="footer-brand-tagline">رفيق للتقسيط</p>
              </div>
            </div>
            
            <p className="footer-description">
              {websiteData.footer?.description || 'منصة التقسيط الميسر للأجهزة الإلكترونية والمنزلية في المملكة العربية السعودية. نقدم أفضل الخدمات وأسهل طرق التقسيط لعملائنا الكرام.'}
            </p>
            
            {/* Contact CTA */}
            <div className="footer-cta">
              <a 
                href={`https://wa.me/${websiteData.whatsappNumber?.replace('+', '') || '966592799888'}?text=مرحباً، أريد معلومات عن تقسيط الأجهزة مع rfeeq رفيق للتقسيط`}
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-whatsapp-button"
              >
                <span className="whatsapp-icon">💬</span>
                <span className="whatsapp-text">تواصل معنا على واتساب</span>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="footer-links-grid">
            {/* Quick Links */}
            <div className="footer-links-section">
              <h4 className="footer-section-title">
                <span className="section-icon">🔗</span>
                روابط سريعة
              </h4>
              <ul className="footer-links-list">
                <li><a href="#home" className="footer-link">الرئيسية</a></li>
                <li><a href="#features" className="footer-link">المميزات</a></li>
                <li><a href="#about" className="footer-link">عن rfeeq</a></li>
                <li><a href="#reviews" className="footer-link">التقييمات</a></li>
                <li><a href="#order" className="footer-link">تقديم الطلب</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-links-section">
              <h4 className="footer-section-title">
                <span className="section-icon">🛍️</span>
                خدماتنا
              </h4>
              <ul className="footer-links-list">
                <li><a href="#services-phones" className="footer-link">تقسيط الجوالات</a></li>
                <li><a href="#services-laptops" className="footer-link">تقسيط اللابتوبات</a></li>
                <li><a href="#services-tablets" className="footer-link">تقسيط الأجهزة اللوحية</a></li>
                <li><a href="#services-home" className="footer-link">تقسيط الأجهزة المنزلية</a></li>
                <li><a href="#services-smart" className="footer-link">تقسيط الأجهزة الذكية</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-links-section">
              <h4 className="footer-section-title">
                <span className="section-icon">🆘</span>
                الدعم والمساعدة
              </h4>
              <ul className="footer-links-list">
                <li><a href="#privacy" className="footer-link">سياسة الخصوصية</a></li>
                <li><a href="#return-policy" className="footer-link">سياسة الاستبدال</a></li>
                <li><a href="#terms" className="footer-link">الشروط والأحكام</a></li>
                <li><a href="#faq" className="footer-link">الأسئلة الشائعة</a></li>
                <li><a href="#contact" className="footer-link">اتصل بنا</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-contact-section">
            <h4 className="footer-section-title">
              <span className="section-icon">📞</span>
              معلومات التواصل
            </h4>
            
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <span className="contact-label">العنوان</span>
                  <span className="contact-value">الرياض, الياسمين 11332</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📱</div>
                <div className="contact-details">
                  <span className="contact-label">الهاتف</span>
                  <span className="contact-value">{websiteData.whatsappNumber || '+966 11 123 4567'}</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <span className="contact-label">البريد الإلكتروني</span>
                  <span className="contact-value">{websiteData.settings?.email || 'info@rfeeq.sa'}</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div className="contact-details">
                  <span className="contact-label">ساعات العمل</span>
                  <span className="contact-value">الأحد - الخميس: 8 ص - 6 م</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="footer-social-section">
          <h4 className="social-title">
            <span className="social-icon">🌟</span>
            تابعنا على وسائل التواصل الاجتماعي
          </h4>
          
          <div className="social-platforms">
            {socialMediaPlatforms.slice(0, 6).map((platform) => (
              <a 
                key={platform.name} 
                href={platform.link} 
                className="social-platform-link" 
                title={platform.text}
                target="_blank" 
                rel="noopener noreferrer"
                data-platform={platform.name}
              >
                <div className="social-platform-icon">
                  <i className={platform.icon}></i>
                </div>
                <span className="social-platform-name">{platform.text}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="footer-map-section">
          <h4 className="map-title">
            <span className="map-icon">🗺️</span>
            موقعنا على الخريطة
          </h4>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.7!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890"
              width="100%" 
              height="250" 
              style={{ border: 0, borderRadius: '20px' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع rfeeq رفيق للتقسيط"
            />
          </div>
        </div>

        {/* Business Information Section */}
        <div className="footer-business-info">
          <div className="business-info-grid">
            <div className="business-info-item">
              <div className="business-info-icon">📋</div>
              <div className="business-info-content">
                <span className="business-info-label">الرقم الضريبي</span>
                <span className="business-info-value">310215262600003</span>
              </div>
            </div>
            
            <div className="business-info-item">
              <div className="business-info-icon">🏢</div>
              <div className="business-info-content">
                <span className="business-info-label">مركز الأعمال السعودي</span>
                <span className="business-info-value">0000189326</span>
              </div>
            </div>
            
            <div className="business-info-item">
              <div className="business-info-icon">📄</div>
              <div className="business-info-content">
                <span className="business-info-label">السجل التجاري</span>
                <span className="business-info-value">1010913105</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright-section">
              <p className="copyright-text">
                © 2025 rfeeq رفيق للتقسيط. جميع الحقوق محفوظة
              </p>
              <p className="copyright-subtitle">
                شريكك الموثوق في عالم التقسيط الذكي
              </p>
            </div>
            
            <div className="footer-bottom-links">
              <a href="#terms" className="bottom-link">الشروط والأحكام</a>
              <a href="#privacy" className="bottom-link">سياسة الخصوصية</a>
              <a href="#sitemap" className="bottom-link">خريطة الموقع</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
