package com.bruno.portfolio.controller;

import com.bruno.portfolio.dto.EducationRequest;
import com.bruno.portfolio.dto.EducationResponse;
import com.bruno.portfolio.dto.ExperienceRequest;
import com.bruno.portfolio.dto.ExperienceResponse;
import com.bruno.portfolio.dto.ProjectRequest;
import com.bruno.portfolio.dto.ProjectResponse;
import com.bruno.portfolio.dto.CvMetadataDto;
import com.bruno.portfolio.model.Language;
import com.bruno.portfolio.service.CvService;
import com.bruno.portfolio.service.EducationService;
import com.bruno.portfolio.service.ExperienceService;
import com.bruno.portfolio.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin")
@Validated
@RequiredArgsConstructor
public class AdminPortfolioController {

    private final EducationService educationService;
    private final ExperienceService experienceService;
    private final ProjectService projectService;
    private final CvService cvService;

    @PostMapping("/educations")
    public EducationResponse createEducation(@Valid @org.springframework.web.bind.annotation.RequestBody EducationRequest request) {
        return educationService.create(request);
    }

    @PutMapping("/educations/{id}")
    public EducationResponse updateEducation(@PathVariable("id") Long id,
                                             @Valid @org.springframework.web.bind.annotation.RequestBody EducationRequest request) {
        return educationService.update(id, request);
    }

    @DeleteMapping("/educations/{id}")
    @org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEducation(@PathVariable("id") Long id) {
        educationService.delete(id);
    }

    @PostMapping("/experiences")
    public ExperienceResponse createExperience(@Valid @org.springframework.web.bind.annotation.RequestBody ExperienceRequest request) {
        return experienceService.create(request);
    }

    @PutMapping("/experiences/{id}")
    public ExperienceResponse updateExperience(@PathVariable("id") Long id,
                                               @Valid @org.springframework.web.bind.annotation.RequestBody ExperienceRequest request) {
        return experienceService.update(id, request);
    }

    @DeleteMapping("/experiences/{id}")
    @org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExperience(@PathVariable("id") Long id) {
        experienceService.delete(id);
    }

    @PostMapping("/projects")
    public ProjectResponse createProject(@Valid @org.springframework.web.bind.annotation.RequestBody ProjectRequest request) {
        return projectService.create(request);
    }

    @PutMapping("/projects/{id}")
    public ProjectResponse updateProject(@PathVariable("id") Long id,
                                         @Valid @org.springframework.web.bind.annotation.RequestBody ProjectRequest request) {
        return projectService.update(id, request);
    }

    @DeleteMapping("/projects/{id}")
    @org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(@PathVariable("id") Long id) {
        projectService.delete(id);
    }

    @PostMapping(value = "/cv/{language}", consumes = "multipart/form-data")
    public CvMetadataDto uploadCv(@PathVariable("language") String language,
                                  @RequestPart("file") MultipartFile file) {
        try {
            Language lang = Language.valueOf(language.toUpperCase());
            return cvService.upload(lang, file);
        } catch (IllegalArgumentException ex) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.BAD_REQUEST, "Unsupported language", ex);
        }
    }
}

