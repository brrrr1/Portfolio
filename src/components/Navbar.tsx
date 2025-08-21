import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import { useSmoothScroll } from '../hooks/useScrollAnimation';
import AnimatedText from './AnimatedText';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const { scrollToElement } = useSmoothScroll();

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.95)']
  );
  const darkBackgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(31, 41, 55, 0.8)', 'rgba(31, 41, 55, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: t('nav.home'), id: 'home' },
    { name: t('nav.about'), id: 'about' },
    { name: t('nav.projects'), id: 'projects' },
    { name: t('nav.contact'), id: 'contact' },
  ];

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const scrollToSection = (sectionId: string) => {
    scrollToElement(sectionId, 80);
    setIsOpen(false);
    setIsLanguageOpen(false);
  };

  const handleLanguageChange = (langCode: string) => {
    setTimeout(() => {
      setLanguage(langCode as 'es' | 'en' | 'de');
      setIsLanguageOpen(false);
    }, 150);
  };

  return (
    <motion.nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md shadow-lg' : ''
      }`}
      style={{
        backgroundColor: isDark ? darkBackgroundColor : backgroundColor
      }}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <motion.button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-lg">B</span>
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
              <AnimatedText as="span" delay={0}>
                Bruno
              </AnimatedText>
            </span>
          </motion.button>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-medium transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <AnimatedText as="span" delay={index}>
                  {item.name}
                </AnimatedText>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  initial={false}
                />
              </motion.button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <motion.button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GlobeAltIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={language}
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 absolute"
                      initial={{ 
                        opacity: 0, 
                        scale: 0.5, 
                        rotate: -180,
                        y: -10
                      }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        rotate: 0,
                        y: 0
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.5, 
                        rotate: 180,
                        y: 10
                      }}
                      transition={{ 
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      {languages.find(lang => lang.code === language)?.flag}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.button>

              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 backdrop-blur-md"
                >
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        language === lang.code ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? (
                <SunIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </motion.button>
          </div>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={() => {
                  setIsOpen(false);
                  setIsLanguageOpen(false);
                }}
              />
              
              {/* Mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto"
              >
              <div className="min-h-full px-4 pt-4 pb-6 space-y-2 bg-white dark:bg-gray-800 shadow-xl">
                {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-4 rounded-lg text-lg font-medium transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatedText as="span" delay={index}>
                    {item.name}
                  </AnimatedText>
                </motion.button>
                ))}

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="relative">
                      <motion.button
                        onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <GlobeAltIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                        <div className="relative w-8 h-8 flex items-center justify-center">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={language}
                              className="text-lg font-medium text-gray-700 dark:text-gray-300 absolute"
                              initial={{ 
                                opacity: 0, 
                                scale: 0.5, 
                                rotate: -180,
                                y: -10
                              }}
                              animate={{ 
                                opacity: 1, 
                                scale: 1, 
                                rotate: 0,
                                y: 0
                              }}
                              exit={{ 
                                opacity: 0, 
                                scale: 0.5, 
                                rotate: 180,
                                y: 10
                              }}
                              transition={{ 
                                duration: 0.3,
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                            >
                              {languages.find(lang => lang.code === language)?.flag}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                      </motion.button>

                      {isLanguageOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 backdrop-blur-md"
                        >
                          {languages.map((lang) => (
                            <motion.button
                              key={lang.code}
                              onClick={() => handleLanguageChange(lang.code)}
                              className={`w-full text-left px-4 py-3 text-base hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                language === lang.code ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                              }`}
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-xl">{lang.flag}</span>
                                <span>{lang.name}</span>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    <motion.button
                      onClick={toggleTheme}
                      className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isDark ? (
                        <SunIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                      ) : (
                        <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 