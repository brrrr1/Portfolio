package com.bruno.portfolio.config;

import com.bruno.portfolio.model.CvDocument;
import com.bruno.portfolio.model.Education;
import com.bruno.portfolio.model.Experience;
import com.bruno.portfolio.model.Language;
import com.bruno.portfolio.model.LocalizedText;
import com.bruno.portfolio.model.Project;
import com.bruno.portfolio.repository.CvDocumentRepository;
import com.bruno.portfolio.repository.EducationRepository;
import com.bruno.portfolio.repository.ExperienceRepository;
import com.bruno.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.time.Instant;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final EducationRepository educationRepository;
    private final ExperienceRepository experienceRepository;
    private final ProjectRepository projectRepository;
    private final CvDocumentRepository cvDocumentRepository;
    private final ResourceLoader resourceLoader;

    @Override
    public void run(String... args) throws Exception {
        if (educationRepository.count() == 0) {
            seedEducation();
        }
        if (experienceRepository.count() == 0) {
            seedExperience();
        }
        if (projectRepository.count() == 0) {
            seedProjects();
        }
        seedCvs();
    }

    private void seedEducation() {
        Education dam = Education.builder()
                .institution("Salesianos San Pedro")
                .logoUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK9GfPg7Uf1cgFs_nlr_5GTcZiW8VyivN-lg&s")
                .yearRange("2023-2025")
                .orderIndex(0)
                .degree(text(
                        "Desarrollo de Aplicaciones Multiplataforma",
                        "Multi-platform Application Development",
                        "Multi-Plattform-Anwendungsentwicklung"))
                .description(text(
                        "Desarrollo de aplicaciones multiplataforma.",
                        "Multi-platform application development.",
                        "Multi-Plattform-Anwendungsentwicklung."
                ))
                .build();

        Education ai = Education.builder()
                .institution("UNIR")
                .logoUrl("https://yt3.googleusercontent.com/KLi8T391TBxKyUecknywtrrvG9tUHX7qhitaW47a-4n6CDUakZHZyZOYJZ2TKCuav_mB8XR4oBA=s900-c-k-c0x00ffffff-no-rj")
                .yearRange("Octubre 2024 - Junio 2025")
                .orderIndex(1)
                .degree(text(
                        "Programa de Formación Universitaria en Inteligencia Artificial",
                        "University training programme in Artificial Intelligence",
                        "Universitäres Ausbildungsprogramm in Künstlicher Intelligenz"))
                .description(text(
                        "Sistemas Inteligentes, Inteligencia Artificial e Ingeniería del Conocimiento, Aprendizaje Automático y Minería de Datos.",
                        "Intelligent Systems, Artificial Intelligence and Knowledge Engineering, Machine Learning and Data Mining.",
                        "Intelligente Systeme, Künstliche Intelligenz und Wissensingenieurwesen, Maschinelles Lernen und Data Mining."
                ))
                .build();

        Education software = Education.builder()
                .institution("UNIR")
                .logoUrl("https://yt3.googleusercontent.com/KLi8T391TBxKyUecknywtrrvG9tUHX7qhitaW47a-4n6CDUakZHZyZOYJZ2TKCuav_mB8XR4oBA=s900-c-k-c0x00ffffff-no-rj")
                .yearRange("Octubre 2024 - Junio 2025")
                .orderIndex(2)
                .degree(text(
                        "Programa de Formación Universitaria en Ingeniería Informática",
                        "University training programme in Software Engineering",
                        "Universitäres Ausbildungsprogramm in Softwaretechnik"))
                .description(text(
                        "Ingeniería del Software, Bases de Datos Avanzadas, Ingeniería del Software Avanzada.",
                        "Software Engineering, Advanced Databases, Advanced Software Engineering.",
                        "Softwaretechnik, Erweiterte Datenbanken, Erweiterte Softwaretechnik."
                ))
                .build();

        Education azure = Education.builder()
                .institution("Microsoft")
                .logoUrl("https://foroalfa.org/imagenes/ilustraciones/1296.jpg")
                .yearRange("2024")
                .orderIndex(3)
                .degree(text(
                        "Microsoft Certified: Azure Data Fundamentals",
                        "Microsoft Certified: Azure Data Fundamentals",
                        "Microsoft Certified: Azure Data Fundamentals"))
                .description(text(
                        "Certificación en fundamentos de datos de Azure.",
                        "Certification in Azure data fundamentals.",
                        "Zertifizierung in Azure-Datenfundamenten."
                ))
                .build();

        educationRepository.saveAll(List.of(dam, ai, software, azure));
    }

    private void seedExperience() {
        Experience ordio = Experience.builder()
                .company("Ordio GmbH")
                .companyUrl("https://www.ordio.com/")
                .logoUrl("https://www.ordio.com/wp-content/uploads/2022/07/ordio.png")
                .orderIndex(0)
                .role(text(
                        "Prácticas como desarrollador fullstack",
                        "Fullstack developer internship",
                        "Praktikum als Fullstack-Entwickler"))
                .description(text(
                        "Desarrollo de aplicación web usando PHP Symfony y React.",
                        "Web application development using PHP Symfony and React.",
                        "Entwicklung von Webanwendungen mit PHP Symfony und React."))
                .location(text(
                        "Colonia, Renania Septentrional-Westfalia, Alemania",
                        "Cologne, North Rhine-Westphalia, Germany",
                        "Köln, Nordrhein-Westfalen, Deutschland"))
                .dateRange(text(
                        "Mar. 2025 - Jul. 2025",
                        "Mar. 2025 - Jul. 2025",
                        "Mrz. 2025 - Jul. 2025"))
                .workMode(text(
                        "Presencial",
                        "On-site",
                        "Vor Ort"))
                .build();

        experienceRepository.save(ordio);
    }

    private void seedProjects() {
        Project lagrada = Project.builder()
                .slug("lagrada")
                .category("web")
                .featured(true)
                .coverImageUrl("/images/lagrada-front.jpg")
                .galleryImages(List.of(
                        "/images/lagrada1.png",
                        "/images/lagrada2.png",
                        "/images/lagrada3.png"
                ))
                .technologies(List.of("Java/Spring", "Angular", "TypeScript", "MySQL", "RxJS", "Angular Material"))
                .githubUrlBack("https://github.com/brrrr1/La-Grada")
                .githubUrlFront("https://github.com/brrrr1/La-Grada-FRONT")
                .orderIndex(0)
                .title(text(
                        "La Grada",
                        "La Grada",
                        "La Grada"))
                .shortDescription(text(
                        "Aplicación web para un bar ficticio que retransmite eventos deportivos. Permite registro de usuarios, selección de equipos favoritos, compra de entradas y gestión de perfiles. Incluye códigos QR, emails y autenticación JWT.",
                        "Web application for a fictional bar that broadcasts sports events. Allows user registration, favorite team selection, ticket purchasing and profile management. Includes QR codes, emails and JWT authentication.",
                        "Webanwendung für eine fiktive Bar, die Sportereignisse überträgt. Ermöglicht Benutzerregistrierung, Auswahl von Lieblingsteams, Ticketkauf und Profilverwaltung. Enthält QR-Codes, E-Mails und JWT-Authentifizierung."))
                .detailedDescription(text(
                        """
                                Aplicación web completa para la gestión y visualización de eventos deportivos en un bar dedicado. Permite a los usuarios registrarse, seleccionar su equipo favorito, comprar entradas y gestionar su perfil de usuario. Incluye ZXing para generación de códigos QR, Jakarta Mail para envío de emails y autenticación JWT. El frontend desarrollado con Angular proporciona una interfaz moderna y funcional para la gestión de eventos deportivos.

                                El proyecto está estructurado en dos partes principales:

                                - Frontend (Angular 18.2.0): Arquitectura modular con componentes reutilizables, servicios para lógica de negocio, sistema de rutas e integración con Angular Material. Utiliza TypeScript 5.5.2, RxJS 7.8.0 y JWT para autenticación.
                                - Backend (Spring Boot 3.4.2): API RESTful con Java 17, Spring Security, Spring Data JPA, PostgreSQL, Lombok, SpringDoc OpenAPI para documentación, ZXing para códigos QR y Jakarta Mail para emails. Incluye manejo de archivos, validación de datos, testing automatizado y soporte Docker para producción.""",
                        """
                                Complete web application for managing and viewing sports events at a dedicated bar. Allows users to register, select their favorite team, purchase tickets and manage their user profile. Includes ZXing for QR code generation, Jakarta Mail for email sending and JWT authentication. The frontend built with Angular provides a modern and functional interface for managing sports events.

                                The project is structured in two main parts:

                                - Frontend (Angular 18.2.0): Modular architecture with reusable components, services for business logic, routing system and Angular Material integration. Uses TypeScript 5.5.2, RxJS 7.8.0 and JWT for authentication.
                                - Backend (Spring Boot 3.4.2): RESTful API with Java 17, Spring Security, Spring Data JPA, PostgreSQL, Lombok, SpringDoc OpenAPI for documentation, ZXing for QR codes and Jakarta Mail for emails. Includes file handling, data validation, automated testing and Docker support for production.""",
                        """
                                Vollständige Webanwendung zur Verwaltung und Anzeige von Sportereignissen in einer spezialisierten Bar. Ermöglicht Benutzern, sich zu registrieren, ihr Lieblingsteam auszuwählen, Tickets zu kaufen und ihr Benutzerprofil zu verwalten. Enthält ZXing für die QR-Code-Generierung, Jakarta Mail für den E-Mail-Versand und JWT-Authentifizierung. Das mit Angular entwickelte Frontend bietet eine moderne und funktionale Oberfläche zur Verwaltung von Sportereignissen.

                                Das Projekt ist in zwei Hauptteile gegliedert:

                                - Frontend (Angular 18.2.0): Modulare Architektur mit wiederverwendbaren Komponenten, Services für Geschäftslogik, Routen-System und Angular Material Integration. Nutzt TypeScript 5.5.2, RxJS 7.8.0 und JWT für Authentifizierung.
                                - Backend (Spring Boot 3.4.2): RESTful API mit Java 17, Spring Security, Spring Data JPA, PostgreSQL, Lombok, SpringDoc OpenAPI für Dokumentation, ZXing für QR-Codes und Jakarta Mail für E-Mails. Beinhaltet Dateiverwaltung, Datenvalidierung, automatisiertes Testing und Docker-Support für Produktion."""))
                .build();

        Project pipocapp = Project.builder()
                .slug("pipocapp")
                .category("web")
                .featured(false)
                .coverImageUrl("/images/pipocapp.jpeg")
                .galleryImages(List.of(
                        "/images/pipocapp1.png",
                        "/images/pipocapp2.png",
                        "/images/pipocapp3.png"
                ))
                .technologies(List.of("React", "JavaScript", "Firebase", "Node.js"))
                .githubUrl("https://github.com/brrrr1/PipocApp")
                .orderIndex(1)
                .title(text("PipocApp", "PipocApp", "PipocApp"))
                .shortDescription(text(
                        "Aplicación web sobre películas y series aprovechando la API de TMDB. Ofrece experiencia personalizada gracias a la posibilidad de utilizar cuentas de TMDB para guardar favoritos y listas personalizadas.",
                        "Web application about movies and series using the TMDB API. Offers personalized experience thanks to the possibility of using TMDB accounts to save favorites and custom lists.",
                        "Webanwendung über Filme und Serien unter Nutzung der TMDB API. Bietet personalisierte Erfahrung dank der Möglichkeit, TMDB-Konten zu verwenden, um Favoriten und benutzerdefinierte Listen zu speichern."))
                .detailedDescription(text(
                        """
                                Aplicación web desarrollada con Angular para explorar películas y series utilizando la API de TMDB. La aplicación ofrece una experiencia personalizada permitiendo a los usuarios utilizar sus cuentas de TMDB para guardar favoritos y crear listas personalizadas.

                                Características técnicas:

                                - Frontend: Angular con TypeScript, HTML y CSS
                                - Integración con TMDB API para obtener datos de películas y series
                                - Sistema de autenticación con cuentas de TMDB
                                - Funcionalidades de favoritos y listas personalizadas
                                - Interfaz moderna y responsiva
                                - Arquitectura modular y componentes reutilizables""",
                        """
                                Web application developed with Angular to explore movies and series using the TMDB API. The application offers a personalized experience allowing users to use their TMDB accounts to save favorites and create custom lists.

                                Technical features:

                                - Frontend: Angular with TypeScript, HTML and CSS
                                - TMDB API integration to fetch movie and series data
                                - Authentication system with TMDB accounts
                                - Favorites and custom lists functionality
                                - Modern and responsive interface
                                - Modular architecture and reusable components""",
                        """
                                Webanwendung entwickelt mit Angular zur Erkundung von Filmen und Serien mithilfe der TMDB API. Die Anwendung bietet eine personalisierte Erfahrung, indem Benutzer ihre TMDB-Konten verwenden, um Favoriten zu speichern und benutzerdefinierte Listen zu erstellen.

                                Technische Merkmale:

                                - Frontend: Angular mit TypeScript, HTML und CSS
                                - TMDB API Integration zur Beschaffung von Film- und Seriendaten
                                - Authentifizierungssystem mit TMDB-Konten
                                - Favoriten- und benutzerdefinierte Listenfunktionen
                                - Moderne und responsive Benutzeroberfläche
                                - Modulare Architektur und wiederverwendbare Komponenten"""))
                .build();

        projectRepository.saveAll(List.of(lagrada, pipocapp));
    }

    private void seedCvs() throws IOException {
        initCv(Language.EN, "classpath:seed/cv/CV_BRUNO_ENGLISH.pdf");
        initCv(Language.ES, "classpath:seed/cv/CV_BRUNO_ESPANOL.pdf");
    }

    private void initCv(Language language, String resourcePath) throws IOException {
        if (cvDocumentRepository.findByLanguage(language).isPresent()) {
            return;
        }

        Resource resource = resourceLoader.getResource(resourcePath);
        byte[] data = FileCopyUtils.copyToByteArray(resource.getInputStream());

        CvDocument document = CvDocument.builder()
                .language(language)
                .fileName(resource.getFilename())
                .contentType("application/pdf")
                .data(data)
                .updatedAt(Instant.now())
                .build();

        cvDocumentRepository.save(document);
    }

    private LocalizedText text(String es, String en, String de) {
        return LocalizedText.builder()
                .es(es)
                .en(en)
                .de(de)
                .build();
    }
}


