export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      contact: 'Contacto'
    },
    
    home: {
      greeting: 'Hola, soy',
      name: 'Bruno',
      description: 'Desarrollador Full Stack apasionado por innovar y dar soluciones que marcan la diferencia.',
      viewProjects: 'Ver Proyectos',
      contact: 'Contactar',
      downloadCV: 'Descargar CV',
      viewCV: 'Ver CV',
      skills: {
        title: 'Mis Habilidades',
        subtitle: 'Tecnologías y herramientas que utilizo para crear soluciones innovadoras',
        backend: 'Backend',
        frontend: 'Frontend',
        cloud: 'Cloud',
        database: 'Database'
      },
      services: {
        title: 'Lo que hago',
        subtitle: 'Servicios que ofrezco para ayudarte a alcanzar tus objetivos',
        web: {
          title: 'Desarrollo Web',
          description: 'Creo aplicaciones web modernas y responsivas usando las últimas tecnologías.'
        },
        backend: {
          title: 'Desarrollo Backend',
          description: 'Desarrollo APIs robustas y escalables con las mejores prácticas.'
        },
        consulting: {
          title: 'Consultoría',
          description: 'Te ayudo a elegir las mejores tecnologías para tu proyecto.'
        }
      }
    },

    about: {
      title: 'Sobre mí',
      story: {
        title: 'Mi Historia',
        p1: 'Soy un desarrollador Full Stack con preferencia por el backend con una pasión por crear soluciones tecnológicas que resuelven problemas reales. Mi viaje en el mundo del desarrollo comenzó en 2023, y desde entonces he trabajado en diversos proyectos que me han permitido crecer tanto profesional como personalmente.',
        p2: 'Me especializo en tecnologías modernas como Java/Spring para el backend, React/TypeScript para el frontend, y también he trabajado con PHP/Symfony y Angular. Además, tengo experiencia con AWS, Elasticsearch y SQL, siempre buscando las mejores prácticas y patrones de diseño para crear código limpio y mantenible.',
        p3: 'Creo firmemente en la importancia de la experiencia del usuario y en crear productos que no solo funcionen bien, sino que también sean agradables de usar.'
      },
      personal: {
        title: 'Datos Personales',
        name: 'Nombre',
        age: 'Edad',
        location: 'Ubicación',
        availability: 'Disponibilidad',
        nameValue: 'Bruno Delgado',
        ageValue: '20 años',
        locationValue: 'Sevilla, España',
        availabilityValue: 'Disponible'
      },
      experience: {
        title: 'Experiencia Profesional',
        subtitle: 'Mi trayectoria profesional en el mundo del desarrollo',
        internship: 'Prácticas como desarrollador fullstack',
        description: 'Desarrollo de aplicación web usando PHP Symfony y React.',
        location: 'Colonia, Renania Septentrional-Westfalia, Alemania',
        onSite: 'Presencial'
      },
      education: {
        title: 'Educación',
        subtitle: 'Mi formación académica y certificaciones',
        programs: {
          multiPlatform: 'Desarrollo de Aplicaciones Multiplataforma',
          ai: 'Programa de Formación Universitaria en Inteligencia Artificial',
          software: 'Programa de Formación Universitaria en Ingeniería Informática',
          azure: 'Microsoft Certified: Azure Data Fundamentals'
        },
        descriptions: {
          multiPlatform: 'Desarrollo de aplicaciones multiplataforma.',
          ai: 'Sistemas Inteligentes, Inteligencia Artificial e Ingeniería del Conocimiento, Aprendizaje Automático y Minería de Datos.',
          software: 'Ingeniería del Software, Bases de Datos Avanzadas, Ingeniería del Software Avanzada.',
          azure: 'Certificación en fundamentos de datos de Azure.'
        }
      },
      interests: {
        title: 'Mis Intereses',
        subtitle: 'Áreas que me apasionan y en las que me gusta trabajar',
        web: {
          title: 'Desarrollo Web',
          description: 'Creación de aplicaciones web modernas y responsivas'
        },
        emerging: {
          title: 'Tecnologías Emergentes',
          description: 'Exploración de nuevas tecnologías y frameworks'
        },
        collaboration: {
          title: 'Colaboración',
          description: 'Trabajo en equipo y metodologías ágiles'
        }
      }
    },

    projects: {
      title: 'Mis Proyectos',
      subtitle: 'Una colección de proyectos que demuestran mis habilidades y pasión por crear soluciones tecnológicas innovadoras.',
      filters: {
        all: 'Todos',
        web: 'Web'
      },
      viewCode: 'Ver Proyecto',
      viewCodeBack: 'Ver Backend',
      viewCodeFront: 'Ver Frontend',
      featured: 'Destacado',
      technologiesUsed: 'Tecnologías utilizadas:',
      noProjects: 'No hay proyectos en esta categoría',
      noProjectsSubtitle: 'Pronto agregaré más proyectos en esta categoría.',
      projects: {
        lagrada: {
          title: 'La Grada',
          description: 'Aplicación web para un bar ficticio que retransmite eventos deportivos. Permite registro de usuarios, selección de equipos favoritos, compra de entradas y gestión de perfiles. Incluye códigos QR, emails y autenticación JWT.',
          detailedDescription: 'Aplicación web completa para la gestión y visualización de eventos deportivos en un bar dedicado. Permite a los usuarios registrarse, seleccionar su equipo favorito, comprar entradas y gestionar su perfil de usuario. Incluye ZXing para generación de códigos QR, Jakarta Mail para envío de emails y autenticación JWT. El frontend desarrollado con Angular proporciona una interfaz moderna y funcional para la gestión de eventos deportivos.\n\nEl proyecto está estructurado en dos partes principales:\n\n• Frontend (Angular 18.2.0): Arquitectura modular con componentes reutilizables, servicios para lógica de negocio, sistema de rutas e integración con Angular Material. Utiliza TypeScript 5.5.2, RxJS 7.8.0 y JWT para autenticación.\n\n• Backend (Spring Boot 3.4.2): API RESTful con Java 17, Spring Security, Spring Data JPA, PostgreSQL, Lombok, SpringDoc OpenAPI para documentación, ZXing para códigos QR y Jakarta Mail para emails. Incluye manejo de archivos, validación de datos, testing automatizado y soporte Docker para producción.'
        },
        pipocapp: {
          title: 'PipocApp',
          description: 'Aplicación web sobre películas y series aprovechando la API de TMDB. Ofrece experiencia personalizada gracias a la posibilidad de utilizar cuentas de TMDB para guardar favoritos y listas personalizadas.',
          detailedDescription: 'Aplicación web desarrollada con Angular para explorar películas y series utilizando la API de TMDB. La aplicación ofrece una experiencia personalizada permitiendo a los usuarios utilizar sus cuentas de TMDB para guardar favoritos y crear listas personalizadas.\n\nCaracterísticas técnicas:\n\n• Frontend: Angular con TypeScript, HTML y CSS\n• Integración con TMDB API para obtener datos de películas y series\n• Sistema de autenticación con cuentas de TMDB\n• Funcionalidades de favoritos y listas personalizadas\n• Interfaz moderna y responsiva\n• Arquitectura modular y componentes reutilizables'
        }
      }

    },

    contact: {
      title: 'Contacto',
      subtitle: '¿Tienes un proyecto en mente? ¿Quieres colaborar? No dudes en contactarme, estaré encantado de hablar contigo.',
      form: {
        title: 'Envíame un mensaje',
        name: 'Nombre',
        email: 'Email',
        subject: 'Asunto',
        message: 'Mensaje',
        send: 'Enviar Mensaje',
        sending: 'Enviando...',
        success: '¡Mensaje enviado con éxito! Te responderé pronto.'
      },
      info: {
        title: 'Información de contacto',
        subtitle: 'Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales. No dudes en contactarme por cualquier medio.',
        email: 'Email',
        phone: 'Teléfono',
        location: 'Ubicación',
        social: 'Sígueme en redes sociales'
      },
      availability: {
        title: 'Disponibilidad',
        subtitle: 'Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales. No dudes en contactarme para discutir tu proyecto.',
        freelance: {
          title: 'Proyectos Freelance',
          description: 'Disponible para proyectos a tiempo parcial'
        },
        collaboration: {
          title: 'Colaboraciones',
          description: 'Abierto a colaborar en proyectos interesantes'
        },
        opportunities: {
          title: 'Oportunidades Laborales',
          description: 'Buscando nuevas oportunidades profesionales'
        }
      }
    },

    footer: {
      description: 'Desarrollador Full Stack apasionado por innovar y dar soluciones que marcan la diferencia.',
      navigation: 'Navegación',
      rights: 'Todos los derechos reservados.'
    }
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact'
    },
    
    home: {
      greeting: 'Hello, I am',
      name: 'Bruno',
      description: 'Full Stack Developer passionate about innovating and delivering solutions that make a difference.',
      viewProjects: 'View Projects',
      contact: 'Contact',
      downloadCV: 'Download CV',
      viewCV: 'View CV',
      skills: {
        title: 'My Skills',
        subtitle: 'Technologies and tools I use to create innovative solutions',
        backend: 'Backend',
        frontend: 'Frontend',
        cloud: 'Cloud',
        database: 'Database'
      },
      services: {
        title: 'What I Do',
        subtitle: 'Services I offer to help you achieve your goals',
        web: {
          title: 'Web Development',
          description: 'I create modern and responsive web applications using the latest technologies.'
        },
        backend: {
          title: 'Backend Development',
          description: 'I develop robust and scalable APIs with best practices.'
        },
        consulting: {
          title: 'Consulting',
          description: 'I help you choose the best technologies for your project.'
        }
      }
    },

    about: {
      title: 'About Me',
      story: {
        title: 'My Story',
        p1: 'I am a Full Stack Developer with a preference for backend development and a passion for creating technological solutions that solve real problems. My journey in the world of development began in 2023, and since then I have worked on various projects that have allowed me to grow both professionally and personally.',
        p2: 'I specialize in modern technologies such as Java/Spring for backend, React/TypeScript for frontend, and I have also worked with PHP/Symfony and Angular. Additionally, I have experience with AWS, Elasticsearch and SQL, always seeking the best practices and design patterns to create clean and maintainable code.',
        p3: 'I firmly believe in the importance of user experience and creating products that not only work well, but are also pleasant to use.'
      },
      personal: {
        title: 'Personal Information',
        name: 'Name',
        age: 'Age',
        location: 'Location',
        availability: 'Availability',
        nameValue: 'Bruno Delgado',
        ageValue: '20 years',
        locationValue: 'Seville, Spain',
        availabilityValue: 'Available'
      },
      experience: {
        title: 'Professional Experience',
        subtitle: 'My professional career in the world of development',
        internship: 'Fullstack developer internship',
        description: 'Web application development using PHP Symfony and React.',
        location: 'Cologne, North Rhine-Westphalia, Germany',
        onSite: 'On-site'
      },
      education: {
        title: 'Education',
        subtitle: 'My academic training and certifications',
        programs: {
          multiPlatform: 'Multi-platform Application Development',
          ai: 'University training programme in Artificial Intelligence',
          software: 'University training programme in Software Engineering',
          azure: 'Microsoft Certified: Azure Data Fundamentals'
        },
        descriptions: {
          multiPlatform: 'Multi-platform application development.',
          ai: 'Intelligent Systems, Artificial Intelligence and Knowledge Engineering, Machine Learning and Data Mining.',
          software: 'Software Engineering, Advanced Databases, Advanced Software Engineering.',
          azure: 'Certification in Azure data fundamentals.'
        }
      },
      interests: {
        title: 'My Interests',
        subtitle: 'Areas that I am passionate about and enjoy working in',
        web: {
          title: 'Web Development',
          description: 'Creation of modern and responsive web applications'
        },
        emerging: {
          title: 'Emerging Technologies',
          description: 'Exploration of new technologies and frameworks'
        },
        collaboration: {
          title: 'Collaboration',
          description: 'Teamwork and agile methodologies'
        }
      }
    },

    projects: {
      title: 'My Projects',
      subtitle: 'A collection of projects that demonstrate my skills and passion for creating innovative technological solutions.',
      filters: {
        all: 'All',
        web: 'Web'
      },
      viewCode: 'View Project',
      viewCodeBack: 'View Backend',
      viewCodeFront: 'View Frontend',
      featured: 'Featured',
      technologiesUsed: 'Technologies used:',
      noProjects: 'No projects in this category',
      noProjectsSubtitle: 'I will add more projects in this category soon.',
      projects: {
        lagrada: {
          title: 'La Grada',
          description: 'Web application for a fictional bar that broadcasts sports events. Allows user registration, favorite team selection, ticket purchasing and profile management. Includes QR codes, emails and JWT authentication.',
          detailedDescription: 'Complete web application for managing and viewing sports events at a dedicated bar. Allows users to register, select their favorite team, purchase tickets and manage their user profile. Includes ZXing for QR code generation, Jakarta Mail for email sending and JWT authentication. The frontend developed with Angular provides a modern and functional interface for managing sports events.\n\nThe project is structured in two main parts:\n\n• Frontend (Angular 18.2.0): Modular architecture with reusable components, services for business logic, routing system and Angular Material integration. Uses TypeScript 5.5.2, RxJS 7.8.0 and JWT for authentication.\n\n• Backend (Spring Boot 3.4.2): RESTful API with Java 17, Spring Security, Spring Data JPA, PostgreSQL, Lombok, SpringDoc OpenAPI for documentation, ZXing for QR codes and Jakarta Mail for emails. Includes file handling, data validation, automated testing and Docker support for production.'
        },
        pipocapp: {
          title: 'PipocApp',
          description: 'Web application about movies and series using the TMDB API. Offers personalized experience thanks to the possibility of using TMDB accounts to save favorites and custom lists.',
          detailedDescription: 'Web application developed with Angular to explore movies and series using the TMDB API. The application offers a personalized experience allowing users to use their TMDB accounts to save favorites and create custom lists.\n\nTechnical features:\n\n• Frontend: Angular with TypeScript, HTML and CSS\n• TMDB API integration to get movie and series data\n• Authentication system with TMDB accounts\n• Favorites and custom lists functionality\n• Modern and responsive interface\n• Modular architecture and reusable components'
        }
      }

    },

    contact: {
      title: 'Contact',
      subtitle: 'Do you have a project in mind? Do you want to collaborate? Do not hesitate to contact me, I will be happy to talk to you.',
      form: {
        title: 'Send me a message',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully! I will respond soon.'
      },
      info: {
        title: 'Contact information',
        subtitle: 'I am available for freelance projects, collaborations and job opportunities. Do not hesitate to contact me through any means.',
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        social: 'Follow me on social media'
      },
      availability: {
        title: 'Availability',
        subtitle: 'I am available for freelance projects, collaborations and job opportunities. Do not hesitate to contact me to discuss your project.',
        freelance: {
          title: 'Freelance Projects',
          description: 'Available for part-time projects'
        },
        collaboration: {
          title: 'Collaborations',
          description: 'Open to collaborating on interesting projects'
        },
        opportunities: {
          title: 'Job Opportunities',
          description: 'Looking for new professional opportunities'
        }
      }
    },

    footer: {
      description: 'Full Stack Developer passionate about innovating and delivering solutions that make a difference.',
      navigation: 'Navigation',
      rights: 'All rights reserved.'
    }
  },

  de: {
    nav: {
      home: 'Startseite',
      about: 'Über mich',
      projects: 'Projekte',
      contact: 'Kontakt'
    },
    
    home: {
      greeting: 'Hallo, ich bin',
      name: 'Bruno',
      description: 'Full Stack Entwickler mit Leidenschaft für Innovation und Lösungen, die einen Unterschied machen.',
      viewProjects: 'Projekte ansehen',
      contact: 'Kontakt',
      downloadCV: 'Lebenslauf herunterladen',
      viewCV: 'Lebenslauf ansehen',
      skills: {
        title: 'Meine Fähigkeiten',
        subtitle: 'Technologien und Tools, die ich verwende, um innovative Lösungen zu erstellen',
        backend: 'Backend',
        frontend: 'Frontend',
        cloud: 'Cloud',
        database: 'Datenbank'
      },
      services: {
        title: 'Was ich mache',
        subtitle: 'Dienstleistungen, die ich anbiete, um Ihnen zu helfen, Ihre Ziele zu erreichen',
        web: {
          title: 'Web-Entwicklung',
          description: 'Ich erstelle moderne und responsive Webanwendungen mit den neuesten Technologien.'
        },
        backend: {
          title: 'Backend-Entwicklung',
          description: 'Ich entwickle robuste und skalierbare APIs mit bewährten Praktiken.'
        },
        consulting: {
          title: 'Beratung',
          description: 'Ich helfe Ihnen bei der Auswahl der besten Technologien für Ihr Projekt.'
        }
      }
    },

    about: {
      title: 'Über mich',
      story: {
        title: 'Meine Geschichte',
        p1: 'Ich bin ein Full Stack Entwickler mit einer Vorliebe für Backend-Entwicklung und einer Leidenschaft für die Erstellung technologischer Lösungen, die echte Probleme lösen. Meine Reise in der Welt der Entwicklung begann 2023, und seitdem habe ich an verschiedenen Projekten gearbeitet, die es mir ermöglicht haben, sowohl beruflich als auch persönlich zu wachsen.',
        p2: 'Ich spezialisiere mich auf moderne Technologien wie Java/Spring für das Backend, React/TypeScript für das Frontend, und ich habe auch mit PHP/Symfony und Angular gearbeitet. Zusätzlich habe ich Erfahrung mit AWS, Elasticsearch und SQL und suche immer nach den besten Praktiken und Designmustern, um sauberen und wartbaren Code zu erstellen.',
        p3: 'Ich glaube fest an die Bedeutung der Benutzererfahrung und daran, Produkte zu erstellen, die nicht nur gut funktionieren, sondern auch angenehm zu verwenden sind.'
      },
      personal: {
        title: 'Persönliche Informationen',
        name: 'Name',
        age: 'Alter',
        location: 'Standort',
        availability: 'Verfügbarkeit',
        nameValue: 'Bruno Delgado',
        ageValue: '20 Jahre',
        locationValue: 'Sevilla, Spanien',
        availabilityValue: 'Verfügbar'
      },
      experience: {
        title: 'Berufserfahrung',
        subtitle: 'Meine berufliche Laufbahn in der Welt der Entwicklung',
        internship: 'Praktikum als Fullstack-Entwickler',
        description: 'Entwicklung von Webanwendungen mit PHP Symfony und React.',
        location: 'Köln, Nordrhein-Westfalen, Deutschland',
        onSite: 'Vor Ort'
      },
      education: {
        title: 'Ausbildung',
        subtitle: 'Meine akademische Ausbildung und Zertifizierungen',
        programs: {
          multiPlatform: 'Multi-Plattform-Anwendungsentwicklung',
          ai: 'Universitäres Ausbildungsprogramm in Künstlicher Intelligenz',
          software: 'Universitäres Ausbildungsprogramm in Softwaretechnik',
          azure: 'Microsoft Certified: Azure Data Fundamentals'
        },
        descriptions: {
          multiPlatform: 'Multi-Plattform-Anwendungsentwicklung.',
          ai: 'Intelligente Systeme, Künstliche Intelligenz und Wissensingenieurwesen, Maschinelles Lernen und Data Mining.',
          software: 'Softwaretechnik, Erweiterte Datenbanken, Erweiterte Softwaretechnik.',
          azure: 'Zertifizierung in Azure-Datenfundamenten.'
        }
      },
      interests: {
        title: 'Meine Interessen',
        subtitle: 'Bereiche, für die ich mich begeistere und in denen ich gerne arbeite',
        web: {
          title: 'Web-Entwicklung',
          description: 'Erstellung moderner und responsiver Webanwendungen'
        },
        emerging: {
          title: 'Aufstrebende Technologien',
          description: 'Erkundung neuer Technologien und Frameworks'
        },
        collaboration: {
          title: 'Zusammenarbeit',
          description: 'Teamarbeit und agile Methoden'
        }
      }
    },

    projects: {
      title: 'Meine Projekte',
      subtitle: 'Eine Sammlung von Projekten, die meine Fähigkeiten und Leidenschaft für die Erstellung innovativer technologischer Lösungen demonstrieren.',
      filters: {
        all: 'Alle',
        web: 'Web'
      },
      viewCode: 'Projekt ansehen',
      viewCodeBack: 'Backend ansehen',
      viewCodeFront: 'Frontend ansehen',
      featured: 'Hervorgehoben',
      technologiesUsed: 'Verwendete Technologien:',
      noProjects: 'Keine Projekte in dieser Kategorie',
      noProjectsSubtitle: 'Ich werde bald weitere Projekte in dieser Kategorie hinzufügen.',
      projects: {
        lagrada: {
          title: 'La Grada',
          description: 'Webanwendung für eine fiktive Bar, die Sportereignisse überträgt. Ermöglicht Benutzerregistrierung, Auswahl von Lieblingsteams, Ticketkauf und Profilverwaltung. Enthält QR-Codes, E-Mails und JWT-Authentifizierung.',
          detailedDescription: 'Vollständige Webanwendung zur Verwaltung und Anzeige von Sportereignissen in einer spezialisierten Bar. Ermöglicht es Benutzern, sich zu registrieren, ihr Lieblingsteam auszuwählen, Tickets zu kaufen und ihr Benutzerprofil zu verwalten. Enthält ZXing für QR-Code-Generierung, Jakarta Mail für E-Mail-Versand und JWT-Authentifizierung. Das mit Angular entwickelte Frontend bietet eine moderne und funktionale Benutzeroberfläche für die Verwaltung von Sportereignissen.\n\nDas Projekt ist in zwei Hauptteile strukturiert:\n\n• Frontend (Angular 18.2.0): Modulare Architektur mit wiederverwendbaren Komponenten, Services für Geschäftslogik, Routing-System und Angular Material Integration. Verwendet TypeScript 5.5.2, RxJS 7.8.0 und JWT für Authentifizierung.\n\n• Backend (Spring Boot 3.4.2): RESTful API mit Java 17, Spring Security, Spring Data JPA, PostgreSQL, Lombok, SpringDoc OpenAPI für Dokumentation, ZXing für QR-Codes und Jakarta Mail für E-Mails. Enthält Dateiverwaltung, Datenvalidierung, automatisierte Tests und Docker-Support für Produktion.'
        },
        pipocapp: {
          title: 'PipocApp',
          description: 'Webanwendung über Filme und Serien unter Nutzung der TMDB API. Bietet personalisierte Erfahrung dank der Möglichkeit, TMDB-Konten zu verwenden, um Favoriten und benutzerdefinierte Listen zu speichern.',
          detailedDescription: 'Webanwendung entwickelt mit Angular zur Erkundung von Filmen und Serien unter Nutzung der TMDB API. Die Anwendung bietet eine personalisierte Erfahrung, die es Benutzern ermöglicht, ihre TMDB-Konten zu verwenden, um Favoriten zu speichern und benutzerdefinierte Listen zu erstellen.\n\nTechnische Merkmale:\n\n• Frontend: Angular mit TypeScript, HTML und CSS\n• TMDB API Integration zur Beschaffung von Film- und Seriendaten\n• Authentifizierungssystem mit TMDB-Konten\n• Favoriten und benutzerdefinierte Listen Funktionalität\n• Moderne und responsive Benutzeroberfläche\n• Modulare Architektur und wiederverwendbare Komponenten'
        }
      }

    },

    contact: {
      title: 'Kontakt',
      subtitle: 'Hast du ein Projekt im Sinn? Möchtest du zusammenarbeiten? Zögere nicht, mich zu kontaktieren, ich freue mich darauf, mit dir zu sprechen.',
      form: {
        title: 'Sende mir eine Nachricht',
        name: 'Name',
        email: 'E-Mail',
        subject: 'Betreff',
        message: 'Nachricht',
        send: 'Nachricht senden',
        sending: 'Wird gesendet...',
        success: 'Nachricht erfolgreich gesendet! Ich werde bald antworten.'
      },
      info: {
        title: 'Kontaktinformationen',
        subtitle: 'Ich bin verfügbar für Freelance-Projekte, Kooperationen und Jobmöglichkeiten. Zögere nicht, mich über jeden Weg zu kontaktieren.',
        email: 'E-Mail',
        phone: 'Telefon',
        location: 'Standort',
        social: 'Folge mir in sozialen Medien'
      },
      availability: {
        title: 'Verfügbarkeit',
        subtitle: 'Ich bin verfügbar für Freelance-Projekte, Kooperationen und Jobmöglichkeiten. Zögere nicht, mich zu kontaktieren, um über Ihr Projekt zu sprechen.',
        freelance: {
          title: 'Freelance-Projekte',
          description: 'Verfügbar für Teilzeitprojekte'
        },
        collaboration: {
          title: 'Kooperationen',
          description: 'Offen für die Zusammenarbeit an interessanten Projekten'
        },
        opportunities: {
          title: 'Jobmöglichkeiten',
          description: 'Suche nach neuen beruflichen Möglichkeiten'
        }
      }
    },

    footer: {
      description: 'Full Stack Entwickler mit Leidenschaft für Innovation und Lösungen, die einen Unterschied machen.',
      navigation: 'Navigation',
      rights: 'Alle Rechte vorbehalten.'
    }
  }
}; 