package com.bruno.portfolio.service;

import com.bruno.portfolio.dto.ExperienceRequest;
import com.bruno.portfolio.dto.ExperienceResponse;
import com.bruno.portfolio.mapper.PortfolioMapper;
import com.bruno.portfolio.model.Experience;
import com.bruno.portfolio.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final PortfolioMapper mapper;

    public List<ExperienceResponse> findAll() {
        return experienceRepository.findAllByOrderByOrderIndexAsc()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public ExperienceResponse create(ExperienceRequest request) {
        Experience experience = mapper.toEntity(request);
        return mapper.toResponse(experienceRepository.save(experience));
    }

    public ExperienceResponse update(Long id, ExperienceRequest request) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Experience not found"));
        mapper.updateExperience(experience, request);
        return mapper.toResponse(experienceRepository.save(experience));
    }

    public void delete(Long id) {
        if (!experienceRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Experience not found");
        }
        experienceRepository.deleteById(id);
    }
}


