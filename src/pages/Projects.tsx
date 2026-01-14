import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CodeBracketIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from '../hooks/useTranslation';
import { fetchProjects } from '../services/api';
import type { Project as ProjectType } from '../types/api';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedText } from '../utils/localizedText';
import { ensureExternalUrl } from '../utils/url';
import AnimatedText from '../components/AnimatedText';


const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetchProjects();
        setProjects(response);
        setHasError(false);
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const loadingMessage = {
    es: 'Cargando proyectos...',
    en: 'Loading projects...',
    de: 'Projekte werden geladen...'
  }[language];

  const errorMessage = {
    es: 'No se pudieron cargar los proyectos.',
    en: 'Projects could not be loaded.',
    de: 'Projekte konnten nicht geladen werden.'
  }[language];

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

  const handleProjectClick = (project: ProjectType) => {
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
    if (selectedProject && selectedImage && selectedProject.galleryImages?.length) {
      const currentIndex = selectedProject.galleryImages.indexOf(selectedImage);
      const nextIndex = (currentIndex + 1) % selectedProject.galleryImages.length;
      setSelectedImage(selectedProject.galleryImages[nextIndex]);
    }
  }, [selectedProject, selectedImage]);

  const previousImage = useCallback(() => {
    if (selectedProject && selectedImage && selectedProject.galleryImages?.length) {
      const currentIndex = selectedProject.galleryImages.indexOf(selectedImage);
      const prevIndex = currentIndex === 0 ? selectedProject.galleryImages.length - 1 : currentIndex - 1;
      setSelectedImage(selectedProject.galleryImages[prevIndex]);
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
    <div id="projects" className="min-h-screen overflow-x-hidden w-full">
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
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
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${activeFilter === filter.id
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

          {isLoading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">{loadingMessage}</p>
          ) : hasError ? (
            <p className="text-center text-red-500">{errorMessage}</p>
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
              >
                {filteredProjects.map((project) => {
                  const liveUrl = ensureExternalUrl(project.liveUrl);
                  return (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.coverImageUrl}
                          alt={getLocalizedText(project.title, language)}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {project.featured && (
                          <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {t('projects.featured')}
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project);
                          }}
                          className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                          title={t('projects.viewDetail')}
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="p-4 sm:p-6 flex flex-col flex-grow bg-gray-100 dark:bg-gray-800">
                        <div className="flex-grow">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {getLocalizedText(project.title, language)}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                            {getLocalizedText(project.shortDescription, language)}
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
                          {liveUrl && (
                            <a
                              href={liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors px-3 sm:px-4 py-2 rounded-full text-center text-sm sm:text-base"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {t('projects.viewDemo')}
                            </a>
                          )}
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
                  )
                })}
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
            </>
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
                    {getLocalizedText(selectedProject.title, language)}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-base sm:text-lg whitespace-pre-line">
                    {getLocalizedText(selectedProject.detailedDescription, language)}
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
                    {ensureExternalUrl(selectedProject.liveUrl) && (
                      <a
                        href={ensureExternalUrl(selectedProject.liveUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors px-4 sm:px-6 py-3 rounded-full text-sm sm:text-base"
                      >
                        {t('projects.viewDemo')}
                      </a>
                    )}
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
                      {t('projects.screenshots') || 'Capturas de pantalla:'}
                    </h3>
                    <div className="space-y-4">
                      {selectedProject.galleryImages?.map((image: string, index: number) => (
                        <div key={index} className="rounded-lg overflow-hidden shadow-md">
                          <img
                            src={image}
                            alt={`${getLocalizedText(selectedProject.title, language)} screenshot ${index + 1}`}
                            className="w-full h-auto max-h-[300px] object-cover sm:object-contain cursor-pointer hover:scale-105 transition-transform duration-200"
                            onClick={() => openImage(image)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block lg:w-1/3 p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex flex-col gap-4 h-full overflow-y-auto">
                    {selectedProject.galleryImages?.map((image: string, index: number) => (
                      <div key={index} className="flex-1 min-h-[200px] sm:min-h-[250px] rounded-lg overflow-hidden shadow-md">
                        <img
                          src={image}
                          alt={`${getLocalizedText(selectedProject.title, language)} screenshot ${index + 1}`}
                          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
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
              className="relative flex items-center justify-center pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative pointer-events-auto">
                <button
                  onClick={closeImage}
                  className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-20 p-2 rounded-full bg-gray-800 text-white hover:bg-opacity-75 transition-all duration-200 shadow-xl border border-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                {selectedProject && selectedProject.galleryImages && selectedProject.galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200 pointer-events-auto"
                    >
                      <ChevronLeftIcon className="h-8 w-8" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200 pointer-events-auto"
                    >
                      <ChevronRightIcon className="h-8 w-8" />
                    </button>
                  </>
                )}

                <img
                  src={selectedImage}
                  alt="Full size project screenshot"
                  className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl bg-black"
                />

                {selectedProject && selectedProject.galleryImages && selectedProject.galleryImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-gray-800 bg-opacity-75 text-white text-sm">
                    {(selectedProject.galleryImages?.indexOf(selectedImage) ?? 0) + 1} / {selectedProject.galleryImages?.length}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects; 