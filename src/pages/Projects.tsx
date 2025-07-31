import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from '../hooks/useTranslation';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      title: 'La Grada',
      description: 'Aplicación web completa para la gestión y visualización de eventos deportivos en un bar dedicado. Permite a los usuarios registrarse, seleccionar su equipo favorito, comprar entradas y gestionar su perfil de usuario.',
      image: '/images/lagrada-back.png',
      technologies: ['Java/Spring', 'Angular', 'TypeScript', 'MySQL'],
      category: 'web',
      liveUrl: null,
      githubUrl: 'https://github.com/brrrr1/La-Grada',
      featured: true
    },
    {
      id: 2,
      title: 'La Grada Frontend',
      description: 'Frontend de la aplicación La Grada desarrollado con Angular que proporciona una interfaz moderna y funcional para la gestión de eventos deportivos.',
      image: '/images/lagrada-front.jpg',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'Angular Material'],
      category: 'web',
      liveUrl: null,
      githubUrl: 'https://github.com/brrrr1/La-Grada-FRONT',
      featured: true
    },
    {
      id: 3,
      title: 'PipocApp',
      description: 'Aplicación web para la gestión y organización de eventos sociales y reuniones.',
      image: '/images/pipocapp.jpeg',
      technologies: ['React', 'JavaScript', 'Firebase', 'Node.js'],
      category: 'web',
      liveUrl: null,
      githubUrl: 'https://github.com/brrrr1/PipocApp',
      featured: false
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

  return (
    <div id="projects" className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t('projects.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
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
                {filter.name}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Project Image */}
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

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
                      >
                        <CodeBracketIcon className="h-4 w-4" />
                        {t('projects.viewCode')}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
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


    </div>
  );
};

export default Projects; 