package com.bruno.portfolio.mapper;

import com.bruno.portfolio.dto.EducationRequest;
import com.bruno.portfolio.dto.EducationResponse;
import com.bruno.portfolio.dto.ExperienceRequest;
import com.bruno.portfolio.dto.ExperienceResponse;
import com.bruno.portfolio.dto.LocalizedTextDto;
import com.bruno.portfolio.dto.ProjectRequest;
import com.bruno.portfolio.dto.ProjectResponse;
import com.bruno.portfolio.model.Education;
import com.bruno.portfolio.model.Experience;
import com.bruno.portfolio.model.LocalizedText;
import com.bruno.portfolio.model.Project;
import org.springframework.stereotype.Component;

@Component
public class PortfolioMapper {

    public LocalizedText toEntity(LocalizedTextDto dto) {
        return LocalizedText.builder()
                .es(dto.es())
                .en(dto.en())
                .de(dto.de())
                .build();
    }

    public LocalizedTextDto toDto(LocalizedText entity) {
        return LocalizedTextDto.builder()
                .es(entity.getEs())
                .en(entity.getEn())
                .de(entity.getDe())
                .build();
    }

    public Education toEntity(EducationRequest request) {
        return Education.builder()
                .institution(request.institution())
                .logoUrl(request.logoUrl())
                .yearRange(request.yearRange())
                .orderIndex(request.orderIndex())
                .degree(toEntity(request.degree()))
                .description(toEntity(request.description()))
                .build();
    }

    public void updateEducation(Education education, EducationRequest request) {
        education.setInstitution(request.institution());
        education.setLogoUrl(request.logoUrl());
        education.setYearRange(request.yearRange());
        education.setOrderIndex(request.orderIndex());
        education.setDegree(toEntity(request.degree()));
        education.setDescription(toEntity(request.description()));
    }

    public EducationResponse toResponse(Education education) {
        return new EducationResponse(
                education.getId(),
                education.getInstitution(),
                education.getLogoUrl(),
                education.getYearRange(),
                toDto(education.getDegree()),
                toDto(education.getDescription()),
                education.getOrderIndex()
        );
    }

    public Experience toEntity(ExperienceRequest request) {
        return Experience.builder()
                .company(request.company())
                .companyUrl(request.companyUrl())
                .logoUrl(request.logoUrl())
                .orderIndex(request.orderIndex())
                .role(toEntity(request.role()))
                .description(toEntity(request.description()))
                .location(toEntity(request.location()))
                .dateRange(toEntity(request.dateRange()))
                .workMode(toEntity(request.workMode()))
                .build();
    }

    public void updateExperience(Experience experience, ExperienceRequest request) {
        experience.setCompany(request.company());
        experience.setCompanyUrl(request.companyUrl());
        experience.setLogoUrl(request.logoUrl());
        experience.setOrderIndex(request.orderIndex());
        experience.setRole(toEntity(request.role()));
        experience.setDescription(toEntity(request.description()));
        experience.setLocation(toEntity(request.location()));
        experience.setDateRange(toEntity(request.dateRange()));
        experience.setWorkMode(toEntity(request.workMode()));
    }

    public ExperienceResponse toResponse(Experience experience) {
        return new ExperienceResponse(
                experience.getId(),
                experience.getCompany(),
                experience.getCompanyUrl(),
                experience.getLogoUrl(),
                toDto(experience.getRole()),
                toDto(experience.getDescription()),
                toDto(experience.getLocation()),
                toDto(experience.getDateRange()),
                toDto(experience.getWorkMode()),
                experience.getOrderIndex()
        );
    }

    public Project toEntity(ProjectRequest request) {
        return Project.builder()
                .slug(request.slug())
                .category(request.category())
                .featured(request.featured())
                .coverImageUrl(request.coverImageUrl())
                .liveUrl(request.liveUrl())
                .githubUrl(request.githubUrl())
                .githubUrlFront(request.githubUrlFront())
                .githubUrlBack(request.githubUrlBack())
                .orderIndex(request.orderIndex())
                .technologies(request.technologies())
                .galleryImages(request.galleryImages())
                .title(toEntity(request.title()))
                .shortDescription(toEntity(request.shortDescription()))
                .detailedDescription(toEntity(request.detailedDescription()))
                .build();
    }

    public void updateProject(Project project, ProjectRequest request) {
        project.setSlug(request.slug());
        project.setCategory(request.category());
        project.setFeatured(request.featured());
        project.setCoverImageUrl(request.coverImageUrl());
        project.setLiveUrl(request.liveUrl());
        project.setGithubUrl(request.githubUrl());
        project.setGithubUrlFront(request.githubUrlFront());
        project.setGithubUrlBack(request.githubUrlBack());
        project.setOrderIndex(request.orderIndex());
        project.setTechnologies(request.technologies());
        project.setGalleryImages(request.galleryImages());
        project.setTitle(toEntity(request.title()));
        project.setShortDescription(toEntity(request.shortDescription()));
        project.setDetailedDescription(toEntity(request.detailedDescription()));
    }

    public ProjectResponse toResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getSlug(),
                project.getCategory(),
                project.getFeatured(),
                project.getCoverImageUrl(),
                project.getLiveUrl(),
                project.getGithubUrl(),
                project.getGithubUrlFront(),
                project.getGithubUrlBack(),
                project.getOrderIndex(),
                project.getTechnologies(),
                project.getGalleryImages(),
                toDto(project.getTitle()),
                toDto(project.getShortDescription()),
                toDto(project.getDetailedDescription())
        );
    }
}


