import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface AnimatedTextProps {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  children, 
  className = '', 
  as: Component = 'span',
  delay = 0 
}) => {
  const { language } = useLanguage();
  const [currentText, setCurrentText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (children !== currentText) {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentText(children);
        setIsAnimating(false);
      }, 150 + delay);
    }
  }, [children, currentText, delay]);

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${language}-${currentText}`}
          initial={{ 
            opacity: 0, 
            y: 10,
            scale: 0.95
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            y: -10,
            scale: 0.95
          }}
          transition={{ 
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: delay * 0.1
          }}
          className="inline-block"
        >
          <Component className={className}>
            {currentText}
          </Component>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedText; 