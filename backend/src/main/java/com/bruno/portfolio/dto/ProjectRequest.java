package com.bruno.portfolio.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProjectRequest(
        @NotBlank String slug,
        @NotBlank String category,
        @NotNull Boolean featured,
        @NotBlank String coverImageUrl,
        String liveUrl,
        String githubUrl,
        String githubUrlFront,
        String githubUrlBack,
        @NotNull @PositiveOrZero Integer orderIndex,
        @NotEmpty List<@NotBlank String> technologies,
        @Size(min = 3, max = 3) List<@NotBlank String> galleryImages,
        @NotNull @Valid LocalizedTextDto title,
        @NotNull @Valid LocalizedTextDto shortDescription,
        @NotNull @Valid LocalizedTextDto detailedDescription
) {
}


