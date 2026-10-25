import { HomeAssistant } from '../types';
import en from './languages/en.json';
import ru from './languages/ru.json';
import uk from './languages/uk.json';

const languages: Record<string, any> = {
  en,
  ru,
  uk,
};

export function getActiveLanguage(hass?: HomeAssistant, configLang?: string): 'ru' | 'en' | 'uk' {
  if (configLang && configLang !== 'auto' && languages[configLang.toLowerCase()]) {
    return configLang.toLowerCase() as 'ru' | 'en' | 'uk';
  }
  const userLang = (
    hass?.locale?.language ||
    hass?.language ||
    (typeof navigator !== 'undefined' ? navigator.language : '') ||
    'uk'
  )
    .toLowerCase()
    .split('-')[0];

  return languages[userLang] ? (userLang as 'ru' | 'en' | 'uk') : 'uk';
}

export function localize(
  key: string,
  hass?: HomeAssistant,
  configLang?: string,
  search?: string,
  replace?: string
): string {
  const activeLang = getActiveLanguage(hass, configLang);

  let translated: any;
  try {
    translated = key.split('.').reduce((o, i) => o?.[i], languages[activeLang]);
  } catch (e) {
    translated = undefined;
  }

  // Fallback to Russian, then English, then raw key
  if (translated === undefined) {
    try {
      translated = key.split('.').reduce((o, i) => o?.[i], languages['ru']);
    } catch (e) {
      translated = undefined;
    }
  }

  if (translated === undefined) {
    try {
      translated = key.split('.').reduce((o, i) => o?.[i], languages['en']);
    } catch (e) {
      translated = undefined;
    }
  }

  if (translated === undefined || typeof translated !== 'string') {
    translated = key;
  }

  if (search && replace) {
    translated = translated.replace(search, replace);
  }

  return translated;
}
