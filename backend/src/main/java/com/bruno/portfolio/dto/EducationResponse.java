package com.bruno.portfolio.dto;

public record EducationResponse(
        Long id,
        String institution,
        String logoUrl,
        String yearRange,
        LocalizedTextDto degree,
        LocalizedTextDto description,
        Integer orderIndex
) {
}


