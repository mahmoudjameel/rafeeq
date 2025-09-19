import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';

interface HeroEditorProps {
  showStatus: (message: string, type: 'success' | 'error' | 'info') => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ showStatus }) => {
  const { websiteData, updateWebsiteData, useLocalStorage } = useWebsite();
  
  const [formData, setFormData] = useState({
    title: 'rfeeq رفيق للتقسيط',
    subtitle: 'حلول ذكية لجميع مشاكل التقسيط',
    mainHeading: 'ما تحتاج تعيش حرب نفسية مع راتبك!',
    whatsappNumber: '+972592799888'
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load current content from context
  useEffect(() => {
    if (websiteData.hero) {
      setFormData({
        title: websiteData.hero.title || 'rfeeq رفيق للتقسيط',
        subtitle: websiteData.hero.subtitle || 'حلول ذكية لجميع مشاكل التقسيط',
        mainHeading: websiteData.hero.mainHeading || 'ما تحتاج تعيش حرب نفسية مع راتبك!',
        whatsappNumber: websiteData.whatsappNumber || '+972592799888'
      });
    }
  }, [websiteData]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateWebsiteData({
        hero: {
          title: formData.title,
          subtitle: formData.subtitle,
          mainHeading: formData.mainHeading
        },
        whatsappNumber: formData.whatsappNumber,
        lastUpdated: new Date()
      });

      showStatus('تم حفظ التغييرات بنجاح!', 'success');
      
      // Show storage status
      if (useLocalStorage) {
        showStatus('تم الحفظ في التخزين المحلي', 'info');
      } else {
        showStatus('تم الحفظ في Firebase بنجاح!', 'success');
      }
    } catch (error: any) {
      console.error('Error saving content:', error);
      showStatus('خطأ في حفظ المحتوى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4" id="hero">
      <div className="card-header">
        <h5><i className="fas fa-home me-2"></i>الصفحة الرئيسية</h5>
      </div>
      <div className="card-body">
        {/* Storage Status */}
        {useLocalStorage && (
          <div className="alert alert-info mb-3" role="alert">
            <i className="fas fa-info-circle me-2"></i>
            يتم استخدام التخزين المحلي بسبب مشاكل في الاتصال بـ Firebase
          </div>
        )}
        
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">العنوان الرئيسي</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="أدخل العنوان الرئيسي"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">العنوان الفرعي</label>
            <input
              type="text"
              className="form-control"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="أدخل العنوان الفرعي"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <label className="form-label">العنوان الثانوي</label>
            <input
              type="text"
              className="form-control"
              name="mainHeading"
              value={formData.mainHeading}
              onChange={handleInputChange}
              placeholder="أدخل العنوان الثانوي"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">رقم الواتساب</label>
            <input
              type="text"
              className="form-control"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              placeholder="أدخل رقم الواتساب"
            />
          </div>
        </div>
        
        <div className="text-center mt-4">
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
            disabled={isLoading}
          >
            <i className="fas fa-save me-2"></i>
            {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;
