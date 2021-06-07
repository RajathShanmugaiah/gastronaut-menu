  
import { useEffect, useState } from 'react';

const useTranslations = (translation) => {
    let currentLanguage = "de"
  const [language, setLanguage] = useState(currentLanguage);
  const languages = Object.keys(translation);
    useEffect(() => {
        setLanguage(language || 'en')
    }, [language]);
    const translate = key => translation?.[language]?.[key];
        return { translate, setLanguage, language, languages };
};
export  default  useTranslations;