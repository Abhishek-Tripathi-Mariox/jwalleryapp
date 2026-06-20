import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import hi from './hi.json';

const LANG_KEY = 'app_language';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

// Load the persisted language on app start.
export const loadStoredLanguage = async () => {
  try {
    const stored = await AsyncStorage.getItem(LANG_KEY);
    if (stored && stored !== i18n.language) {
      await i18n.changeLanguage(stored);
    }
  } catch (e) {}
};

// Change + persist the language ('en' | 'hi').
export const setAppLanguage = async (lng) => {
  try {
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem(LANG_KEY, lng);
  } catch (e) {}
};

export default i18n;
