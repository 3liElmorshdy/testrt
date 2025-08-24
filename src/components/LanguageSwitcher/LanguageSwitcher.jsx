import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    // Update document language and direction attributes
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="language-switcher">
      <button
        onClick={toggleLanguage}
        className="language-icon-btn"
        title={i18n.language === 'en' ? t('arabic') : t('english')}
      >
        <i className="fa-solid fa-language"></i>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
