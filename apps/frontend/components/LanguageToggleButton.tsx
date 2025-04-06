import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

const LanguageToggleButton = () => {
  const { i18n } = useTranslation();

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const toggleLanguage = useCallback(debounce(() => {
    const newLanguage = i18n.language === 'en' ? 'es' : 'en';
    console.log(`Switching language to: ${newLanguage}`);
    i18n.changeLanguage(newLanguage);
  }, 300), [i18n]);

  return (
    <Button
      variant="languageChange"
      size="sm"
      className="flex items-center justify-center"
      style={{ width: '65px', height: '18px', borderRadius: '7.5px', fontSize: '10px', color: '#000000', overflow: 'visible' }}
      onClick={toggleLanguage}
    >
      {i18n.language === 'en' ? 'English' : 'Español'}
      <img src="/language.svg" alt="Language Icon" style={{ width: '12px', height: '12px' }} />
    </Button>
  );
};

export default LanguageToggleButton; 