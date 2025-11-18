package com.bruno.portfolio.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ExperienceRequest(
        @NotBlank String company,
        String companyUrl,
        String logoUrl,
        @NotNull @Valid LocalizedTextDto role,
        @NotNull @Valid LocalizedTextDto description,
        @NotNull @Valid LocalizedTextDto location,
        @NotNull @Valid LocalizedTextDto dateRange,
        @NotNull @Valid LocalizedTextDto workMode,
        @NotNull @PositiveOrZero Integer orderIndex
) {
}


