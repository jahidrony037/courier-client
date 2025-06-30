import i18n from 'i18next'; // Import directly from i18next
import LanguageDetector from 'i18next-browser-languagedetector'; // Import the language detector
import { initReactI18next } from 'react-i18next'; // Import directly from react-i18next
import bnTranslation from '../../public/locales/bn/translation.json'; // Your translation files
import enTranslation from '../../public/locales/en/translation.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      bn: {
        translation: bnTranslation
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;