package com.forohub.foroHub.domain.topico;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;

public record DatosActualizarTopico(
        @Size(max = 100) String titulo,
        @Size(max = 255) String mensaje,
        @JsonProperty("idCurso") Long idCurso,
        StatusTopico status) {
}
