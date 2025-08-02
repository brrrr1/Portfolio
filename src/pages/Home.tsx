import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from '../hooks/useTranslation';

// Import local images
import brunoProfile from '../assets/images/bruno-profile.jpg';
import cvFile from '../assets/docs/CV 2025.pdf';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const skills = [
    { name: 'Java/Spring', category: t('home.skills.backend') },
    { name: 'React/TypeScript', category: t('home.skills.frontend') },
    { name: 'PHP/Symfony', category: t('home.skills.backend') },
    { name: 'Angular', category: t('home.skills.frontend') },
    { name: 'AWS', category: t('home.skills.cloud') },
    { name: 'SQL', category: t('home.skills.database') },
  ];

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'CV_Bruno_Delgado_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div id="home" className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* Foto de Perfil */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
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
              {t('home.greeting')}{' '}
              <span className="text-primary-600 dark:text-primary-400">{t('home.name')}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              {t('home.description')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
            >
              <button
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="btn-primary inline-flex items-center"
              >
                {t('home.viewProjects')}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="btn-secondary inline-flex items-center"
              >
                {t('home.contact')}
              </button>
              <button
                onClick={handleDownloadCV}
                className="btn-secondary inline-flex items-center"
              >
                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                {t('home.downloadCV')}
              </button>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.skills.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('home.skills.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow h-full flex flex-col justify-center"
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

      {/* Services Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('home.services.subtitle')}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-lg transition-shadow h-full flex flex-col justify-center"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
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