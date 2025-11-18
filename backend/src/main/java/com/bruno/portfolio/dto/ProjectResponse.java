package com.bruno.portfolio.dto;

import java.util.List;

public record ProjectResponse(
        Long id,
        String slug,
        String category,
        Boolean featured,
        String coverImageUrl,
        String liveUrl,
        String githubUrl,
        String githubUrlFront,
        String githubUrlBack,
        Integer orderIndex,
        List<String> technologies,
        List<String> galleryImages,
        LocalizedTextDto title,
        LocalizedTextDto shortDescription,
        LocalizedTextDto detailedDescription
) {
}


