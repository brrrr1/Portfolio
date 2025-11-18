import type { LocalizedText, Language } from '../types/api';

export function getLocalizedText(
  text?: LocalizedText,
  language: Language = 'es'
): string {
  if (!text) {
    return '';
  }

  return text[language] ?? text.es ?? '';
}


