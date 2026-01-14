import type { Education, Project, Experience } from '../types/api';

// Imports for images
import mf1 from '../assets/images/mediafetch1.jpeg';
import mf2 from '../assets/images/mediafetch2.jpeg';
import mf3 from '../assets/images/mediafetch3.jpeg';
import lagradaCover from '../assets/images/lagrada-front.jpg';
import lagrada1 from '../assets/images/lagrada1.png';
import lagrada2 from '../assets/images/lagrada2.png';
import lagrada3 from '../assets/images/lagrada3.png';
import pipocappCover from '../assets/images/pipocapp.jpeg';
import pipocapp1 from '../assets/images/pipocapp1.png';
import pipocapp2 from '../assets/images/pipocapp2.png';
import pipocapp3 from '../assets/images/pipocapp3.png';

export const mockEducation: Education[] = [
    {
        id: 1,
        institution: 'Salesianos San Pedro',
        logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK9GfPg7Uf1cgFs_nlr_5GTcZiW8VyivN-lg&s',
        yearRange: '2023-2025',
        degree: {
            es: 'Desarrollo de Aplicaciones Multiplataforma',
            en: 'Multi-platform Application Development',
            de: 'Multi-Plattform-Anwendungsentwicklung'
        },
        description: {
            es: 'Desarrollo de aplicaciones multiplataforma.',
            en: 'Multi-platform application development.',
            de: 'Multi-Plattform-Anwendungsentwicklung.'
        },
        orderIndex: 0
    },
    {
        id: 2,
        institution: 'UNIR',
        logoUrl: 'https://yt3.googleusercontent.com/KLi8T391TBxKyUecknywtrrvG9tUHX7qhitaW47a-4n6CDUakZHZyZOYJZ2TKCuav_mB8XR4oBA=s900-c-k-c0x00ffffff-no-rj',
        yearRange: 'Octubre 2024 - Junio 2025',
        degree: {
            es: 'Programa de Formación Universitaria en Inteligencia Artificial',
            en: 'University training programme in Artificial Intelligence',
            de: 'Universitäres Ausbildungsprogramm in Künstlicher Intelligenz'
        },
        description: {
            es: 'Sistemas Inteligentes, Inteligencia Artificial e Ingeniería del Conocimiento, Aprendizaje Automático y Minería de Datos.',
            en: 'Intelligent Systems, Artificial Intelligence and Knowledge Engineering, Machine Learning and Data Mining.',
            de: 'Intelligente Systeme, Künstliche Intelligenz und Wissensingenieurwesen, Maschinelles Lernen und Data Mining.'
        },
        orderIndex: 1
    },
    {
        id: 3,
        institution: 'UNIR',
        logoUrl: 'https://yt3.googleusercontent.com/KLi8T391TBxKyUecknywtrrvG9tUHX7qhitaW47a-4n6CDUakZHZyZOYJZ2TKCuav_mB8XR4oBA=s900-c-k-c0x00ffffff-no-rj',
        yearRange: 'Octubre 2024 - Junio 2025',
        degree: {
            es: 'Programa de Formación Universitaria en Ingeniería Informática',
            en: 'University training programme in Software Engineering',
            de: 'Universitäres Ausbildungsprogramm in Softwaretechnik'
        },
        description: {
            es: 'Ingeniería del Software, Bases de Datos Avanzadas, Ingeniería del Software Avanzada.',
            en: 'Software Engineering, Advanced Databases, Advanced Software Engineering.',
            de: 'Softwaretechnik, Erweiterte Datenbanken, Erweiterte Softwaretechnik.'
        },
        orderIndex: 2
    },
    {
        id: 4,
        institution: 'Microsoft',
        logoUrl: 'https://foroalfa.org/imagenes/ilustraciones/1296.jpg',
        yearRange: '2025',
        degree: {
            es: 'Microsoft Certified: Azure Data Fundamentals',
            en: 'Microsoft Certified: Azure Data Fundamentals',
            de: 'Microsoft Certified: Azure Data Fundamentals'
        },
        description: {
            es: 'Certificación en fundamentos de datos de Azure.',
            en: 'Certification in Azure data fundamentals.',
            de: 'Zertifizierung in Azure-Datenfundamenten.'
        },
        orderIndex: 3
    },
    {
        id: 5,
        institution: 'Canterbury Christ Church University',
        logoUrl: 'https://photos.applyboard.com/schools/000/002/471/logos/original/CCCU-GUSInUni-Logo-Nov2023.png?1699273441',
        yearRange: '2026',
        degree: {
            es: 'Grado en Ingeniería Informática',
            en: 'Bachelor Degree in Computer Science, Online Studying (Last year)',
            de: 'Bachelor-Abschluss in Informatik, Online-Studium (letztes Jahr)'
        },
        description: {
            es: 'Inteligencia Artificial, Ciberseguridad, Cloud y Datos, Sistemas Operativos Avanzados',
            en: 'Artificial Intelligence, Cybersecurity, Intelligent Cloud and Data, Advanced Operating Systems',
            de: 'Künstliche Intelligenz, Cybersicherheit, Intelligente Cloud und Daten, Fortschrittliche Betriebssysteme'
        },
        orderIndex: 4
    }
];

export const mockProjects: Project[] = [
    {
        id: 3,
        slug: 'mediafetch',
        category: 'web',
        featured: true,
        coverImageUrl: mf1,
        liveUrl: 'https://mediafetch-production.up.railway.app/',
        githubUrl: 'https://github.com/brrrr1/MediaFetch',
        githubUrlFront: null,
        githubUrlBack: null,
        orderIndex: 0,
        technologies: ['React 18', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'yt-dlp', 'FFmpeg'],
        galleryImages: [mf1, mf2, mf3],
        title: {
            es: 'MediaFetch',
            en: 'MediaFetch',
            de: 'MediaFetch'
        },
        shortDescription: {
            es: 'Un descargador de medios universal y premium con un motor de temas adaptativo dinámico. Detecta Inteligentemente la plataforma (YouTube, TikTok, etc.) y transforma su estética.',
            en: 'A premium, universal media downloader with a dynamic adaptive theme engine. MediaFetch intelligently detects the platform from your URL (YouTube, TikTok, Instagram, Twitter) and transforms its entire aesthetic to match the source.',
            de: 'Ein erstklassiger, universeller Medien-Downloader mit einer dynamischen, adaptiven Theme-Engine. MediaFetch erkennt die Plattform intelligent anhand Ihrer URL und passt die Ästhetik an.'
        },
        detailedDescription: {
            es: 'Aplicación web desarrollada con React para extraer audio y video de múltiples plataformas de redes sociales. La aplicación ofrece una experiencia fluida permitiendo a los usuarios procesar medios en alta calidad sin cuentas ni seguimiento.\n\nCaracterísticas técnicas:\n\n• Motor de Temas Adaptativo: La interfaz cambia fluidamente los colores de acento, brillos de fondo y temas basados en el enlace pegado\n• Audio de Alta Fidelidad: Transcodificación FFmpeg en tiempo real (192kbps MP3)\n• Video de Calidad Master: Extrae automáticamente los mejores formatos MP4 (hasta 4K/1080p)\n• Transiciones Líquidas: Transiciones ultra suaves de 1.2s entre temas\n• Soporte Multiplataforma: YouTube, TikTok, Instagram Reels, Twitter (X)\n• Seguro y Ligero: Sin seguimiento, sin cuentas, construido sobre binarios de código abierto',
            en: 'Web application developed with React to extract audio and video from multiple social media platforms. The application offers a seamless experience allowing users to process media in high quality without accounts or tracking.\n\nTechnical features:\n\n• Adaptive Theme Engine: The UI fluidly shifts accent colors, background glows, and layout themes based on the pasted link\n• High-Fidelity Audio: Real-time FFmpeg transcoding ensures 192kbps MP3 extraction from any video source\n• Master Quality Video: Automatically fetches the best available MP4 formats (up to 4K/1080p) without quality loss\n• Liquid Transitions: Ultra-smooth 1.2s ease-in-out transitions between themes\n• Multi-Platform Support: YouTube (Standard & Shorts), TikTok, Instagram Reels, Twitter (X)\n• Secure & Lightweight: Zero tracking, no accounts needed, built on robust open-source binaries',
            de: 'Webanwendung entwickelt mit React zum Extrahieren von Audio und Video von mehreren Social-Media-Plattformen. Die Anwendung bietet eine nahtlose Erfahrung, die es Benutzern ermöglicht, Medien in hoher Qualität ohne Konten oder Tracking zu verarbeiten.\n\nTechnische Merkmale:\n\n• Adaptive Theme Engine: Die Benutzeroberfläche ändert fließend Akzentfarben, Hintergrundleuchten und Layout-Themen basierend auf dem eingefügten Link\n• High-Fidelity Audio: Echtzeit-FFmpeg-Transcodierung (192kbps MP3)\n• Master Quality Video: Ruft automatisch die besten verfügbaren MP4-Formate ab (bis zu 4K/1080p)\n• Flüssige Übergänge: Ultra-weiche 1,2s Übergänge zwischen Themen\n• Multi-Plattform-Support: YouTube, TikTok, Instagram Reels, Twitter (X)\n• Sicher & Leichtgewichtig: Kein Tracking, keine Konten, basierend auf robusten Open-Source-Binärdateien'
        }
    },
    {
        id: 1,
        slug: 'lagrada',
        category: 'web',
        featured: false,
        coverImageUrl: lagradaCover,
        liveUrl: null,
        githubUrl: null,
        githubUrlFront: 'https://github.com/brrrr1/La-Grada-FRONT',
        githubUrlBack: 'https://github.com/brrrr1/La-Grada',
        orderIndex: 1,
        technologies: ['Java/Spring', 'Angular', 'TypeScript', 'MySQL', 'RxJS', 'Angular Material'],
        galleryImages: [lagrada1, lagrada2, lagrada3],
        title: {
            es: 'La Grada',
            en: 'La Grada',
            de: 'La Grada'
        },
        shortDescription: {
            es: 'Aplicación web para un bar ficticio que retransmite eventos deportivos. Permite registro de usuarios, selección de equipos favoritos, compra de entradas y gestión de perfiles. Incluye códigos QR, emails y autenticación JWT.',
            en: 'Web application for a fictional bar that broadcasts sports events. Allows user registration, favorite team selection, ticket purchasing and profile management. Includes QR codes, emails and JWT authentication.',
            de: 'Webanwendung für eine fiktive Bar, die Sportereignisse überträgt. Ermöglicht Benutzerregistrierung, Auswahl von Lieblingsteams, Ticketkauf und Profilverwaltung. Enthält QR-Codes, E-Mails und JWT-Authentifizierung.'
        },
        detailedDescription: {
            es: 'Aplicación web completa para la gestión y visualización de eventos deportivos en un bar dedicado. Permite a los usuarios registrarse, seleccionar su equipo favorito, comprar entradas y gestionar su perfil de usuario. Incluye ZXing para generación de códigos QR, Jakarta Mail para envío de emails y autenticación JWT. El frontend desarrollado con Angular proporciona una interfaz moderna y funcional para la gestión de eventos deportivos.\n\nEl proyecto está estructurado en dos partes principales:\n\n• Frontend (Angular 18.2.0): Arquitectura modular con componentes reutilizables, servicios para lógica de negocio, sistema de rutas e integración con Angular Material. Utiliza TypeScript 5.5.2, RxJS 7.8.0 y JWT para autenticación.\n\n• Backend (Spring Boot 3.4.2): API RESTful con Java 17, Spring Security, Spring Data JPA, PostgreSQL, Lombok, SpringDoc OpenAPI para documentación, ZXing para códigos QR y Jakarta Mail para emails. Incluye manejo de archivos, validación de datos, testing automatizado y soporte Docker para producción.',
            en: 'Complete web application for managing and viewing sports events at a dedicated bar. Allows users to register, select their favorite team, purchase tickets and manage their user profile. Includes ZXing for QR code generation, Jakarta Mail for email sending and JWT authentication. The frontend built with Angular provides a modern and functional interface for managing sports events.\n\nThe project is structured in two main parts:\n\n• Frontend (Angular 18.2.0): Modular architecture with reusable components, services for business logic, routing system and Angular Material integration. Uses TypeScript 5.5.2, RxJS 7.8.0 and JWT for authentication.\n\n• Backend (Spring Boot 3.4.2): RESTful API with Java 17, Spring Security, Spring Data JPA, PostgreSQL, Lombok, SpringDoc OpenAPI for documentation, ZXing for QR codes and Jakarta Mail for emails. Includes file handling, data validation, automated testing and Docker support for production.',
            de: 'Vollständige Webanwendung zur Verwaltung und Anzeige von Sportereignissen in einer spezialisierten Bar. Ermöglicht Benutzern, sich zu registrieren, ihr Lieblingsteam auszuwählen, Tickets zu kaufen und ihr Benutzerprofil zu verwalten. Enthält ZXing für die QR-Code-Generierung, Jakarta Mail für den E-Mail-Versand und JWT-Authentifizierung. Das mit Angular entwickelte Frontend bietet eine moderne und funktionale Oberfläche zur Verwaltung von Sportereignissen.\n\nDas Projekt ist in zwei Hauptteile gegliedert:\n\n• Frontend (Angular 18.2.0): Modulare Architektur mit wiederverwendbaren Komponenten, Services für Geschäftslogik, Routen-System und Angular Material Integration. Nutzt TypeScript 5.5.2, RxJS 7.8.0 und JWT für Authentifizierung.\n\n• Backend (Spring Boot 3.4.2): RESTful API mit Java 17, Spring Security, Spring Data JPA, PostgreSQL, Lombok, SpringDoc OpenAPI für Dokumentation, ZXing für QR-Codes und Jakarta Mail für E-Mails. Beinhaltet Dateiverwaltung, Datenvalidierung, automatisiertes Testing und Docker-Support für Produktion.'
        }
    },
    {
        id: 2,
        slug: 'pipocapp',
        category: 'web',
        featured: false,
        coverImageUrl: pipocappCover,
        liveUrl: null,
        githubUrl: 'https://github.com/brrrr1/PipocApp',
        githubUrlFront: null,
        githubUrlBack: null,
        orderIndex: 2,
        technologies: ['React', 'JavaScript', 'Firebase', 'Node.js'],
        galleryImages: [pipocapp1, pipocapp2, pipocapp3],
        title: {
            es: 'PipocApp',
            en: 'PipocApp',
            de: 'PipocApp'
        },
        shortDescription: {
            es: 'Aplicación web sobre películas y series aprovechando la API de TMDB. Ofrece experiencia personalizada gracias a la posibilidad de utilizar cuentas de TMDB para guardar favoritos y listas personalizadas.',
            en: 'Web application about movies and series using the TMDB API. Offers personalized experience thanks to the possibility of using TMDB accounts to save favorites and custom lists.',
            de: 'Webanwendung über Filme und Serien unter Nutzung der TMDB API. Bietet personalisierte Erfahrung dank der Möglichkeit, TMDB-Konten zu verwenden, um Favoriten und benutzerdefinierte Listen zu speichern.',
        },
        detailedDescription: {
            es: 'Aplicación web desarrollada con Angular para explorar películas y series utilizando la API de TMDB. La aplicación ofrece una experiencia personalizada permitiendo a los usuarios utilizar sus cuentas de TMDB para guardar favoritos y crear listas personalizadas.\n\nCaracterísticas técnicas:\n\n• Frontend: Angular con TypeScript, HTML y CSS\n• Integración con TMDB API para obtener datos de películas y series\n• Sistema de autenticación con cuentas de TMDB\n• Funcionalidades de favoritos y listas personalizadas\n• Interfaz moderna y responsiva\n• Arquitectura modular y componentes reutilizables',
            en: 'Web application developed with Angular to explore movies and series using the TMDB API. The application offers a personalized experience allowing users to use their TMDB accounts to save favorites and create custom lists.\n\nTechnical features:\n\n• Frontend: Angular with TypeScript, HTML and CSS\n• TMDB API integration to fetch movie and series data\n• Authentication system with TMDB accounts\n• Favorites and custom lists functionality\n• Modern and responsive interface\n• Modular architecture and reusable components',
            de: 'Webanwendung entwickelt mit Angular zur Erkundung von Filmen und Serien mithilfe der TMDB API. Die Anwendung bietet eine personalisierte Erfahrung, indem Benutzer ihre TMDB-Konten verwenden, um Favoriten zu speichern und benutzerdefinierte Listen zu erstellen.\n\nTechnische Merkmale:\n\n• Frontend: Angular mit TypeScript, HTML und CSS\n• TMDB API Integration zur Beschaffung von Film- und Seriendaten\n• Authentifizierungssystem mit TMDB-Konten\n• Favoriten- und benutzerdefinierte Listenfunktionen\n• Moderne und responsive Benutzeroberfläche\n• Modulare Architektur und wiederverwendbare Komponenten'
        }
    }
];

export const mockExperiences: Experience[] = [
    {
        id: 1,
        company: 'Ordio GmbH',
        companyUrl: 'https://www.ordio.com/',
        logoUrl: 'https://www.ordio.com/wp-content/uploads/2022/07/ordio.png',
        role: {
            es: 'Prácticas como desarrollador fullstack',
            en: 'Fullstack developer internship',
            de: 'Praktikum als Fullstack-Entwickler'
        },
        description: {
            es: 'Desarrollo de aplicación web usando PHP Symfony y React.',
            en: 'Web application development using PHP Symfony and React.',
            de: 'Entwicklung von Webanwendungen mit PHP Symfony und React.'
        },
        location: {
            es: 'Colonia, Renania Septentrional-Westfalia, Alemania',
            en: 'Cologne, North Rhine-Westphalia, Germany',
            de: 'Köln, Nordrhein-Westfalen, Deutschland'
        },
        dateRange: {
            es: 'Mar. 2025 - Jul. 2025',
            en: 'Mar. 2025 - Jul. 2025',
            de: 'Mrz. 2025 - Jul. 2025'
        },
        workMode: {
            es: 'Presencial',
            en: 'On-site',
            de: 'Vor Ort'
        },
        orderIndex: 0
    }
];
