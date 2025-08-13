import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CodeBracketIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from '../hooks/useTranslation';
import AnimatedText from '../components/AnimatedText';

import lagradaFront from '../assets/images/lagrada-front.jpg';
import pipocapp from '../assets/images/pipocapp.jpeg';
import lagrada1 from '../assets/images/lagrada1.png';
import lagrada2 from '../assets/images/lagrada2.png';
import lagrada3 from '../assets/images/lagrada3.png';
import pipocapp1 from '../assets/images/pipocapp1.png';
import pipocapp2 from '../assets/images/pipocapp2.png';
import pipocapp3 from '../assets/images/pipocapp3.png';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      title: t('projects.projects.lagrada.title'),
      description: t('projects.projects.lagrada.description'),
      image: lagradaFront,
      technologies: ['Java/Spring', 'Angular', 'TypeScript', 'MySQL', 'RxJS', 'Angular Material'],
      category: 'web',
      liveUrl: null,
      githubUrlBack: 'https://github.com/brrrr1/La-Grada',
      githubUrlFront: 'https://github.com/brrrr1/La-Grada-FRONT',
      featured: true,
      modalImages: [lagrada1, lagrada2, lagrada3]
    },
    {
      id: 2,
      title: t('projects.projects.pipocapp.title'),
      description: t('projects.projects.pipocapp.description'),
      image: pipocapp,
      technologies: ['React', 'JavaScript', 'Firebase', 'Node.js'],
      category: 'web',
      liveUrl: null,
      githubUrl: 'https://github.com/brrrr1/PipocApp',
      featured: false,
      modalImages: [pipocapp1, pipocapp2, pipocapp3]
    }
  ];

  const filters = [
    { id: 'all', name: t('projects.filters.all') },
    { id: 'web', name: t('projects.filters.web') }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const openImage = (image: string) => {
    setSelectedImage(image);
  };

  const closeImage = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const nextImage = useCallback(() => {
    if (selectedProject && selectedImage) {
      const currentIndex = selectedProject.modalImages.indexOf(selectedImage);
      const nextIndex = (currentIndex + 1) % selectedProject.modalImages.length;
      setSelectedImage(selectedProject.modalImages[nextIndex]);
    }
  }, [selectedProject, selectedImage]);

  const previousImage = useCallback(() => {
    if (selectedProject && selectedImage) {
      const currentIndex = selectedProject.modalImages.indexOf(selectedImage);
      const prevIndex = currentIndex === 0 ? selectedProject.modalImages.length - 1 : currentIndex - 1;
      setSelectedImage(selectedProject.modalImages[prevIndex]);
    }
  }, [selectedProject, selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') {
          closeImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'ArrowLeft') {
          previousImage();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedProject, nextImage, previousImage, closeImage]);

  useEffect(() => {
    if (selectedProject || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, selectedImage]);

  return (
    <div id="projects" className="min-h-screen overflow-x-hidden">
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <AnimatedText as="span" delay={0}>
                {t('projects.title')}
              </AnimatedText>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <AnimatedText as="span" delay={1}>
                {t('projects.subtitle')}
              </AnimatedText>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <AnimatedText as="span" delay={filter.id === 'all' ? 0 : 1}>
                  {filter.name}
                </AnimatedText>
              </button>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
                onClick={() => handleProjectClick(project)}
                              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t('projects.featured')}
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 flex flex-col flex-grow bg-gray-100 dark:bg-gray-800">
                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 flex flex-col sm:flex-row justify-center gap-2">
                    {project.githubUrlBack && project.githubUrlFront ? (
                      <>
                        <a
                          href={project.githubUrlBack}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors px-3 sm:px-4 py-2 rounded-full text-center text-sm sm:text-base"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <CodeBracketIcon className="h-4 w-4" />
                          {t('projects.viewCodeBack')}
                        </a>
                        <a
                          href={project.githubUrlFront}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors px-3 sm:px-4 py-2 rounded-full text-center text-sm sm:text-base"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <CodeBracketIcon className="h-4 w-4" />
                          {t('projects.viewCodeFront')}
                        </a>
                      </>
                    ) : project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors px-3 sm:px-4 py-2 rounded-full text-center text-sm sm:text-base"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CodeBracketIcon className="h-4 w-4" />
                        {t('projects.viewCode')}
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CodeBracketIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('projects.noProjects')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('projects.noProjectsSubtitle')}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-[95vw] sm:max-w-4xl lg:max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              <div className="flex flex-col lg:flex-row h-full overflow-hidden">
                <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-base sm:text-lg whitespace-pre-line">
                    {t(`projects.projects.${selectedProject.title.toLowerCase().replace(/\s+/g, '')}.detailedDescription`)}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {t('projects.technologiesUsed')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    {selectedProject.githubUrlBack && selectedProject.githubUrlFront ? (
                      <>
                        <a
                          href={selectedProject.githubUrlBack}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors px-4 sm:px-6 py-3 rounded-full text-sm sm:text-base"
                        >
                          <CodeBracketIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                          {t('projects.viewCodeBack')}
                        </a>
                        <a
                          href={selectedProject.githubUrlFront}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors px-4 sm:px-6 py-3 rounded-full text-sm sm:text-base"
                        >
                          <CodeBracketIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                          {t('projects.viewCodeFront')}
                        </a>
                      </>
                    ) : selectedProject.githubUrl ? (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors px-4 sm:px-6 py-3 rounded-full text-sm sm:text-base"
                      >
                        <CodeBracketIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        {t('projects.viewCode')}
                      </a>
                    ) : null}
                  </div>

                  <div className="lg:hidden mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Capturas de pantalla:
                    </h3>
                    <div className="space-y-4">
                      {selectedProject.modalImages?.map((image: string, index: number) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                          <img
                            src={image}
                            alt={`${selectedProject.title} screenshot ${index + 1}`}
                            className="w-full h-auto max-h-[300px] object-contain rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
                            onClick={() => openImage(image)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block lg:w-1/3 p-4 sm:p-6 bg-gray-50 dark:bg-gray-700">
                  <div className="flex flex-col gap-4 h-full">
                    {selectedProject.modalImages?.map((image: string, index: number) => (
                      <div key={index} className="flex-1 min-h-[200px] sm:min-h-[250px]">
                        <img
                          src={image}
                          alt={`${selectedProject.title} screenshot ${index + 1}`}
                          className="w-full h-full object-contain rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
                          onClick={() => openImage(image)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm"
              onClick={closeImage}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[95vw] sm:max-w-[90vw] max-h-[95vh] sm:max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImage}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 p-2 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200"
              >
                <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {selectedProject && selectedProject.modalImages.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200"
                  >
                    <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200"
                  >
                    <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </>
              )}

              <img
                src={selectedImage}
                alt="Full size project screenshot"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />

              {selectedProject && selectedProject.modalImages.length > 1 && (
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-10 px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-gray-800 bg-opacity-50 text-white text-xs sm:text-sm">
                  {selectedProject.modalImages.indexOf(selectedImage) + 1} / {selectedProject.modalImages.length}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects; 