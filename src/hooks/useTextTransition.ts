import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const useTextTransition = () => {
  const { language } = useLanguage();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayText, setDisplayText] = useState<string>('');
  const [pendingText, setPendingText] = useState<string>('');

  const animateTextChange = (newText: string) => {
    if (displayText === newText) return;

    setIsTransitioning(true);
    setPendingText(newText);

    setTimeout(() => {
      setDisplayText(newText);
      setIsTransitioning(false);
    }, 150);
  };

  useEffect(() => {
    if (pendingText) {
      animateTextChange(pendingText);
    }
  }, [language]);

  return {
    displayText,
    isTransitioning,
    animateTextChange
  };
}; 