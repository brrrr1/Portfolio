package com.bruno.portfolio.service;

import com.bruno.portfolio.dto.EducationRequest;
import com.bruno.portfolio.dto.EducationResponse;
import com.bruno.portfolio.mapper.PortfolioMapper;
import com.bruno.portfolio.model.Education;
import com.bruno.portfolio.repository.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationService {

    private final EducationRepository educationRepository;
    private final PortfolioMapper mapper;

    public List<EducationResponse> findAll() {
        return educationRepository.findAllByOrderByOrderIndexAsc()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public EducationResponse create(EducationRequest request) {
        Education education = mapper.toEntity(request);
        return mapper.toResponse(educationRepository.save(education));
    }

    public EducationResponse update(Long id, EducationRequest request) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Education not found"));
        mapper.updateEducation(education, request);
        return mapper.toResponse(educationRepository.save(education));
    }

    public void delete(Long id) {
        if (!educationRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Education not found");
        }
        educationRepository.deleteById(id);
    }
}


