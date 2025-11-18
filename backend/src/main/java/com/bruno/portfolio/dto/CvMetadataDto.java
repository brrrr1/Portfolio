package com.bruno.portfolio.dto;

import com.bruno.portfolio.model.Language;

import java.time.Instant;

public record CvMetadataDto(
        Language language,
        String fileName,
        Instant updatedAt
) {
}


