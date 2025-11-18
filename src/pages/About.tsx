import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "../hooks/useTranslation";
import { fetchEducations, fetchExperiences } from "../services/api";
import type { Education, Experience } from "../types/api";
import { useLanguage } from "../contexts/LanguageContext";
import { getLocalizedText } from "../utils/localizedText";
import { ensureExternalUrl } from "../utils/url";
import AnimatedText from "../components/AnimatedText";

import brunoProfile from "../assets/images/bruno-profile.jpg";

const About: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [education, setEducation] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadingMessage = {
    es: "Cargando información...",
    en: "Loading information...",
    de: "Informationen werden geladen..."
  }[language];

  const errorMessage = {
    es: "No se pudo cargar la información desde el backend.",
    en: "Unable to load information from the backend.",
    de: "Informationen konnten nicht vom Backend geladen werden."
  }[language];

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const [educationResponse, experienceResponse] = await Promise.all([
          fetchEducations(),
          fetchExperiences(),
        ]);
        setEducation(educationResponse);
        setExperiences(experienceResponse);
        setHasError(false);
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const interests = [
    {
      title: t("about.interests.web.title"),
      description: t("about.interests.web.description"),
      icon: CodeBracketIcon,
    },
    {
      title: t("about.interests.emerging.title"),
      description: t("about.interests.emerging.description"),
      icon: RocketLaunchIcon,
    },
    {
      title: t("about.interests.collaboration.title"),
      description: t("about.interests.collaboration.description"),
      icon: UserGroupIcon,
    },
  ];

  return (
    <div id="about" className="min-h-screen overflow-x-hidden w-full">
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
                {t("about.title")}
              </AnimatedText>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t("about.story.title")}
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>{t("about.story.p1")}</p>
                <p>{t("about.story.p2")}</p>
                <p>{t("about.story.p3")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8"
            >
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary-100 dark:border-primary-800 shadow-lg">
                  <img
                    src={brunoProfile}
                    alt="Bruno Delgado"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (target && fallback) {
                        target.style.display = "none";
                        fallback.style.display = "flex";
                      }
                    }}
                  />
                  <div
                    className="w-full h-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-2xl"
                    style={{ display: "none" }}
                  >
                    BD
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("about.personal.title")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {t("about.personal.name")}:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {t("about.personal.nameValue")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {t("about.personal.age")}:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {t("about.personal.ageValue")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {t("about.personal.location")}:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {t("about.personal.locationValue")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {t("about.personal.availability")}:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {t("about.personal.availabilityValue")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("about.experience.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("about.experience.subtitle")}
            </p>
          </motion.div>

          <div className="space-y-8">
            {isLoading && (
              <p className="text-center text-gray-500 dark:text-gray-400">{loadingMessage}</p>
            )}
            {hasError && !isLoading && (
              <p className="text-center text-red-500">{errorMessage}</p>
            )}
            {!isLoading && !hasError && experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:space-x-3">
                  <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg flex-shrink-0 self-start">
                    {exp.logoUrl ? (
                      (() => {
                        const companyLink = ensureExternalUrl(exp.companyUrl);
                        if (companyLink) {
                          return (
                            <a
                              href={companyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block hover:opacity-80 transition-opacity"
                            >
                              <img
                                src={exp.logoUrl}
                                alt={exp.company}
                                className="h-5 w-5 object-contain"
                              />
                            </a>
                          );
                        }
                        return (
                          <img
                            src={exp.logoUrl}
                            alt={exp.company}
                            className="h-5 w-5 object-contain"
                          />
                        );
                      })()
                    ) : (
                      <BriefcaseIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-1">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {getLocalizedText(exp.role, language)}
                        </h3>
                        {(() => {
                          const companyLink = ensureExternalUrl(exp.companyUrl);
                          if (companyLink) {
                            return (
                              <a
                                href={companyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                              >
                                <p className="text-primary-600 dark:text-primary-400 font-medium">
                                  {exp.company}
                                </p>
                              </a>
                            );
                          }
                          return (
                            <p className="text-primary-600 dark:text-primary-400 font-medium">
                              {exp.company}
                            </p>
                          );
                        })()}
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          {getLocalizedText(exp.dateRange, language)}
                        </span>
                        <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
                          {getLocalizedText(exp.workMode, language)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1 whitespace-pre-line">
                      {getLocalizedText(exp.description, language)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getLocalizedText(exp.location, language)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("about.education.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("about.education.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading && (
              <p className="text-center text-gray-500 dark:text-gray-400 col-span-2">{loadingMessage}</p>
            )}
            {hasError && !isLoading && (
              <p className="text-center text-red-500 col-span-2">{errorMessage}</p>
            )}
            {!isLoading && !hasError && education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 h-full"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:space-x-4">
                  <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg flex-shrink-0 self-start">
                    {edu.logoUrl ? (
                      <img
                        src={edu.logoUrl}
                        alt={edu.institution}
                        className="h-6 w-6 object-contain"
                      />
                    ) : (
                      <AcademicCapIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex-1 min-w-0">
                        {getLocalizedText(edu.degree, language)}
                      </h3>
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-medium flex-shrink-0 whitespace-nowrap">
                        {edu.yearRange}
                      </span>
                    </div>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      {getLocalizedText(edu.description, language)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("about.interests.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("about.interests.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center h-full flex flex-col justify-center"
              >
                <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <interest.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {interest.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {interest.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};


export default About;
