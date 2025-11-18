package com.bruno.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record LocalizedTextDto(
        @NotBlank(message = "Texto en español requerido") String es,
        @NotBlank(message = "Texto en inglés requerido") String en,
        @NotBlank(message = "Texto en alemán requerido") String de
) {
}


