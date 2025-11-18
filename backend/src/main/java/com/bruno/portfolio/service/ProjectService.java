package com.bruno.portfolio.service;

import com.bruno.portfolio.dto.ProjectRequest;
import com.bruno.portfolio.dto.ProjectResponse;
import com.bruno.portfolio.mapper.PortfolioMapper;
import com.bruno.portfolio.model.Project;
import com.bruno.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final PortfolioMapper mapper;

    public List<ProjectResponse> findAll() {
        return projectRepository.findAllByOrderByOrderIndexAsc()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public ProjectResponse create(ProjectRequest request) {
        if (projectRepository.existsBySlug(request.slug())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Slug already exists");
        }
        Project project = mapper.toEntity(request);
        return mapper.toResponse(projectRepository.save(project));
    }

    public ProjectResponse update(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));

        if (!project.getSlug().equals(request.slug()) && projectRepository.existsBySlug(request.slug())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Slug already exists");
        }

        mapper.updateProject(project, request);
        return mapper.toResponse(projectRepository.save(project));
    }

    public void delete(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
        }
        projectRepository.deleteById(id);
    }
}


