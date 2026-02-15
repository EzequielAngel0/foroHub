package com.forohub.foroHub.domain.topico;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DatosRegistroTopico(
                @NotBlank @Size(max = 100) String titulo,
                @NotBlank @Size(max = 255) String mensaje,
                @NotNull Long idCurso) {
}
