package com.bruno.portfolio.dto;

public record ExperienceResponse(
        Long id,
        String company,
        String companyUrl,
        String logoUrl,
        LocalizedTextDto role,
        LocalizedTextDto description,
        LocalizedTextDto location,
        LocalizedTextDto dateRange,
        LocalizedTextDto workMode,
        Integer orderIndex
) {
}


