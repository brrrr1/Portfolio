import React from "react";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "../hooks/useTranslation";

import brunoProfile from "../assets/images/bruno-profile.jpg";

const About: React.FC = () => {
  const { t } = useTranslation();

  const experience = [
    {
      year: "Mar. 2025 - Jul. 2025",
      title: t("about.experience.internship"),
      company: "Ordio GmbH",
      description: t("about.experience.description"),
      logo: "https://www.ordio.com/wp-content/uploads/2022/07/ordio.png",
    },
  ];

  const education = [
    {
      year: "2023-2025",
      degree: t("about.education.programs.multiPlatform"),
      institution: "Salesianos San Pedro",
      description: t("about.education.descriptions.multiPlatform"),
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK9GfPg7Uf1cgFs_nlr_5GTcZiW8VyivN-lg&s",
    },
    {
      year: "Octubre 2024 - Junio 2025",
      degree: t("about.education.programs.ai"),
      institution: "UNIR",
      description: t("about.education.descriptions.ai"),
      logo: "https://yt3.googleusercontent.com/KLi8T391TBxKyUecknywtrrvG9tUHX7qhitaW47a-4n6CDUakZHZyZOYJZ2TKCuav_mB8XR4oBA=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      year: "Octubre 2024 - Junio 2025",
      degree: t("about.education.programs.software"),
      institution: "UNIR",
      description: t("about.education.descriptions.software"),
      logo: "https://yt3.googleusercontent.com/KLi8T391TBxKyUecknywtrrvG9tUHX7qhitaW47a-4n6CDUakZHZyZOYJZ2TKCuav_mB8XR4oBA=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      year: "2024",
      degree: t("about.education.programs.azure"),
      institution: "Microsoft",
      description: t("about.education.descriptions.azure"),
      logo: "https://foroalfa.org/imagenes/ilustraciones/1296.jpg",
    },
  ];

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
    <div id="about" className="min-h-screen">
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t("about.title")}
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
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg flex-shrink-0">
                    {exp.logo ? (
                      <a
                        href="https://www.ordio.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="h-5 w-5 object-contain"
                        />
                      </a>
                    ) : (
                      <BriefcaseIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {exp.title}
                        </h3>
                        <a
                          href="https://www.ordio.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                        >
                          <p className="text-primary-600 dark:text-primary-400 font-medium">
                            {exp.company}
                          </p>
                        </a>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          {exp.year}
                        </span>
                        <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
                          {t("about.experience.onSite")}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                      {exp.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t("about.experience.location")}
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
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 h-full"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
                    {edu.logo ? (
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="h-6 w-6 object-contain"
                      />
                    ) : (
                      <AcademicCapIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex-1 min-w-0">
                        {edu.degree}
                      </h3>
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-medium flex-shrink-0 whitespace-nowrap">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {edu.description}
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
