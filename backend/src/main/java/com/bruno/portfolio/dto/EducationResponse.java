package com.bruno.portfolio.dto;

public record EducationResponse(
        Long id,
        String institution,
        String logoUrl,
        LocalizedTextDto yearRange,
        LocalizedTextDto degree,
        LocalizedTextDto description,
        Integer orderIndex,
        String pdfUrl,
        String certificateUrl
) {
}


