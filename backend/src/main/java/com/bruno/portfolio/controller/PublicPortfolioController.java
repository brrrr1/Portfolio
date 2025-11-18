package com.bruno.portfolio.controller;

import com.bruno.portfolio.dto.CvMetadataDto;
import com.bruno.portfolio.dto.EducationResponse;
import com.bruno.portfolio.dto.ExperienceResponse;
import com.bruno.portfolio.dto.ProjectResponse;
import com.bruno.portfolio.model.CvDocument;
import com.bruno.portfolio.model.Language;
import com.bruno.portfolio.service.CvService;
import com.bruno.portfolio.service.EducationService;
import com.bruno.portfolio.service.ExperienceService;
import com.bruno.portfolio.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicPortfolioController {

    private final EducationService educationService;
    private final ExperienceService experienceService;
    private final ProjectService projectService;
    private final CvService cvService;

    @GetMapping("/educations")
    public List<EducationResponse> educations() {
        return educationService.findAll();
    }

    @GetMapping("/experiences")
    public List<ExperienceResponse> experiences() {
        return experienceService.findAll();
    }

    @GetMapping("/projects")
    public List<ProjectResponse> projects() {
        return projectService.findAll();
    }

    @GetMapping("/cv/metadata")
    public List<CvMetadataDto> cvMetadata() {
        return cvService.getMetadata();
    }

    @GetMapping("/cv/{language}")
    public ResponseEntity<byte[]> downloadCv(@PathVariable("language") String language) {
        Language lang = parseLanguage(language);
        CvDocument document = cvService.getDocument(lang);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(document.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + document.getFileName())
                .body(document.getData());
    }

    private Language parseLanguage(String value) {
        return switch (value.toLowerCase()) {
            case "es", "spanish", "espanol", "español" -> Language.ES;
            case "en", "english" -> Language.EN;
            case "de", "german", "deutsch" -> Language.DE;
            default -> throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.BAD_REQUEST, "Unsupported language");
        };
    }
}

