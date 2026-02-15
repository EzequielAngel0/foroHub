package com.forohub.foroHub.infra.errores;

import java.time.Instant;

public record ApiError(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path,
        Object details) {
}
