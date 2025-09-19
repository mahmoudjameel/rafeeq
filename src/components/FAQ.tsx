import React, { useState } from 'react';
import { useWebsite } from '../context/WebsiteContext';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { websiteData } = useWebsite();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const defaultFAQ: FAQItem[] = [
    {
      question: "ما هي شروط الخدمات مع rfeeq رفيق - ليس فقط للتقسيط؟",
      answer: "شروط الخدمات مع رفيق تشمل: أن تكون سعودي الجنسية، عمرك 20 سنة أو أكثر، موظف براتب ثابت، وبدون كفيل أو ضامن."
    },
    {
      question: "كم مدة التقسيط المتاحة؟",
      answer: "نقدم تقسيط لمدة 36 شهر مع دفعة أولى 0 ريال، مما يجعل التقسيط مريح وسهل."
    },
    {
      question: "ما هي الأجهزة المتاحة للتقسيط؟",
      answer: "جميع الأجهزة الإلكترونية: جوالات، لابتوبات، تابلت، أجهزة منزلية، وأجهزة ذكية."
    },
    {
      question: "هل التقسيط آمن وموثوق؟",
      answer: "نعم، نحن شركة مرخصة ومعتمدة في المملكة العربية السعودية، ونضمن لك الأمان والموثوقية التامة."
    },
    {
      question: "كيف يمكنني التواصل معكم؟",
      answer: "يمكنك التواصل معنا عبر الواتساب، الهاتف، أو زيارة موقعنا الإلكتروني. فريق خدمة العملاء متاح 24/7."
    }
  ];

  const faqItems: FAQItem[] = websiteData.faq?.items || defaultFAQ;

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="faq-section" id="faq" style={{ backgroundColor: '#f9f9f9', padding: '40px 20px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2 className="faq-title" style={{ color: '#333', fontWeight: 'bold' }}>
                <i className="fas fa-question-circle ms-2" style={{ color: '#8B0000' }}></i>
                الأسئلة الشائعة
              </h2>
              <p className="faq-description" style={{ color: '#555' }}>
                إجابات على أكثر الأسئلة شيوعاً حول خدمات التقسيط
              </p>
            </div>
            
            <div className="faq-container" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', padding: '20px' }}>
              {faqItems.map((item: FAQItem, index: number) => (
                <div key={index} className="faq-item" style={{ marginBottom: '15px' }}>
                  <button
                    className={`faq-question ${openItems.includes(index) ? 'active' : ''}`}
                    onClick={() => toggleItem(index)}
                    aria-expanded={openItems.includes(index)}
                    aria-controls={`faq-answer-${index}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#f5f5f5',
                      color: '#333',
                      padding: '10px 15px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <i className={`fas fa-chevron-${openItems.includes(index) ? 'up' : 'down'} faq-icon`} style={{ color: '#8B0000' }}></i>
                  </button>
                  
                  <div
                    id={`faq-answer-${index}`}
                    className={`faq-answer ${openItems.includes(index) ? 'show' : ''}`}
                    aria-hidden={!openItems.includes(index)}
                    style={{
                      marginTop: '10px',
                      padding: '10px 15px',
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      color: '#555'
                    }}
                  >
                    <div className="faq-answer-content">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
