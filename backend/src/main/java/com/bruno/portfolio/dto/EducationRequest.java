package com.bruno.portfolio.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record EducationRequest(
        @NotBlank String institution,
        String logoUrl,
        @NotBlank String yearRange,
        @NotNull @Valid LocalizedTextDto degree,
        @NotNull @Valid LocalizedTextDto description,
        @NotNull @PositiveOrZero Integer orderIndex
) {
}


