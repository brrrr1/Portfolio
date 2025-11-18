package com.bruno.portfolio.auth;

import jakarta.validation.constraints.NotBlank;

public record AuthRequest(@NotBlank String password) {
}


