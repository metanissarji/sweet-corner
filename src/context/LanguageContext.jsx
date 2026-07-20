import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n/translations.js';

/**
 * שפת האתר: עברית (ברירת מחדל) או ערבית. שתיהן RTL — הכיוון לא משתנה.
 * הבחירה נשמרת במכשיר; t(key, vars) מחזיר את הטקסט בשפה הפעילה
 * עם נפילה חזרה לעברית אם מפתח חסר.
 */
const LanguageContext = createContext(null);
const STORAGE_KEY = 'sweet-corner-lang';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'ar' ? 'ar' : 'he';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key, vars) => {
      let s = translations[lang]?.[key] ?? translations.he[key] ?? key;
      if (vars) {
        for (const k in vars) s = s.split(`{${k}}`).join(String(vars[k]));
      }
      return s;
    },
    [lang]
  );

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'he' ? 'ar' : 'he'));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
