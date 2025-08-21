import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRightIcon,
  DocumentArrowDownIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation, useParallax, useSmoothScroll } from '../hooks/useScrollAnimation';
import AnimatedText from '../components/AnimatedText';

import brunoProfile from '../assets/images/bruno-profile.jpg';
import cvFileEnglish from '../assets/docs/CV 2025.pdf';
import cvFileSpanish from '../assets/docs/CV Español.pdf';


const AnimatedGradientName: React.FC<{ name: string }> = ({ name }) => {
  return (
    <span 
      className="bg-gradient-to-r from-blue-400 via-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent"
      style={{
        backgroundSize: '200% 200%',
        animation: 'gradient-x 3.5s ease infinite'
      }}
    >
      {name}
    </span>
  );
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollToElement } = useSmoothScroll();
  
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: skillsRef, isVisible: skillsVisible } = useScrollAnimation();
  const { elementRef: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  
  const { elementRef: profileRef, offset: profileOffset } = useParallax(0.3);
  
  const { scrollYProgress } = useScroll();
  const springConfig = { stiffness: 300, damping: 30 };
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.95]), springConfig);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const skills = [
    { name: 'Java/Spring', category: t('home.skills.backend') },
    { name: 'React/TypeScript', category: t('home.skills.frontend') },
    { name: 'PHP/Symfony', category: t('home.skills.backend') },
    { name: 'Angular', category: t('home.skills.frontend') },
    { name: 'AWS', category: t('home.skills.cloud') },
    { name: 'SQL', category: t('home.skills.database') },
  ];

  const handleDownloadCV = (language: 'english' | 'spanish') => {
    const link = document.createElement('a');
    if (language === 'english') {
      link.href = cvFileEnglish;
      link.download = 'CV_Bruno_Delgado_2025.pdf';
    } else {
      link.href = cvFileSpanish;
      link.download = 'CV_Bruno_Delgado_Espanol.pdf';
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDropdownOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };



  return (
    <div id="home" className="min-h-screen overflow-x-hidden w-full">
      <section 
        ref={heroRef}
        className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
      >

        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              x: [0, -35, 0],
              y: [0, 25, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/3 w-48 h-48 md:w-96 md:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroVisible ? "visible" : "hidden"}
            style={{ opacity, scale }}
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <div 
                ref={profileRef}
                className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl image-hover"
                style={{ transform: `translateY(${profileOffset}px)` }}
              >
                <img
                  src={brunoProfile}
                  alt="Bruno Delgado"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (target && fallback) {
                      target.style.display = 'none';
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-full h-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-4xl" style={{display: 'none'}}>
                  BD
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            >
              <AnimatedText as="span" delay={0}>
                {t('home.greeting')}
              </AnimatedText>{' '}
              <AnimatedGradientName name={t('home.name')} />
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              <AnimatedText as="span" delay={1}>
                {t('home.description')}
              </AnimatedText>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
            >
              <button
                onClick={() => scrollToElement('projects', 80)}
                className="btn-primary inline-flex items-center group w-full sm:w-auto"
              >
                <AnimatedText as="span" delay={2}>
                  {t('home.viewProjects')}
                </AnimatedText>
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => scrollToElement('contact', 80)}
                className="btn-secondary inline-flex items-center group w-full sm:w-auto"
              >
                <AnimatedText as="span" delay={3}>
                  {t('home.contact')}
                </AnimatedText>
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="btn-secondary inline-flex items-center group w-full sm:w-auto"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  <AnimatedText as="span" delay={4}>
                    {t('home.downloadCV')}
                  </AnimatedText>
                  <ChevronDownIcon className={`ml-2 h-5 w-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-0 mb-2 w-full sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-[9999] glass-effect"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => handleDownloadCV('english')}
                        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors duration-200"
                      >
                        <span className="mr-2">🇺🇸</span>
                        English CV
                      </button>
                      <button
                        onClick={() => handleDownloadCV('spanish')}
                        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors duration-200"
                      >
                        <span className="mr-2">🇪🇸</span>
                        CV Español
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section 
        ref={skillsRef}
        className="section-padding bg-white dark:bg-gray-900"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={skillsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <AnimatedText as="span" delay={0}>
                {t('home.skills.title')}
              </AnimatedText>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              <AnimatedText as="span" delay={1}>
                {t('home.skills.subtitle')}
              </AnimatedText>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={skillsVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-center card-hover"
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{skill.name}</h3>
                  <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section 
        ref={servicesRef}
        className="section-padding bg-gray-50 dark:bg-gray-800"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <AnimatedText as="span" delay={0}>
                {t('home.services.title')}
              </AnimatedText>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              <AnimatedText as="span" delay={1}>
                {t('home.services.subtitle')}
              </AnimatedText>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('home.services.web.title'),
                description: t('home.services.web.description'),
                icon: '🌐'
              },
              {
                title: t('home.services.backend.title'),
                description: t('home.services.backend.description'),
                icon: '⚙️'
              },
              {
                title: t('home.services.consulting.title'),
                description: t('home.services.consulting.description'),
                icon: '💡'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={servicesVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-center card-hover"
              >
                <div className="text-4xl mb-4 float">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 