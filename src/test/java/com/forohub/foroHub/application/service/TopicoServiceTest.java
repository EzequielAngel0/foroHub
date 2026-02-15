package com.forohub.foroHub.application.service;

import com.forohub.foroHub.domain.curso.Curso;
import com.forohub.foroHub.domain.curso.CursoRepository;
import com.forohub.foroHub.domain.topico.*;
import com.forohub.foroHub.domain.usuario.Usuario;
import com.forohub.foroHub.infra.errores.ApiException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TopicoServiceTest {

    @Mock
    private TopicoRepository topicoRepository;

    @Mock
    private CursoRepository cursoRepository;

    @InjectMocks
    private TopicoService topicoService;

    @Test
    void crearDebeLanzarBadRequestSiCursoNoExiste() {
        var usuario = new Usuario(1L, "Angel", "angel@forohub.com", "encoded");
        var datos = new DatosRegistroTopico("Titulo", "Mensaje", 99L);
        when(cursoRepository.findById(99L)).thenReturn(Optional.empty());

        ApiException ex = assertThrows(ApiException.class, () -> topicoService.crear(datos, usuario));

        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatus());
    }

    @Test
    void crearDebeLanzarConflictSiTopicoDuplicado() {
        var usuario = new Usuario(1L, "Angel", "angel@forohub.com", "encoded");
        var curso = new Curso(1L, "Spring", "Backend");
        var datos = new DatosRegistroTopico("Titulo", "Mensaje", 1L);
        when(cursoRepository.findById(1L)).thenReturn(Optional.of(curso));
        when(topicoRepository.existsByTituloAndMensaje("Titulo", "Mensaje")).thenReturn(true);

        ApiException ex = assertThrows(ApiException.class, () -> topicoService.crear(datos, usuario));

        assertEquals(HttpStatus.CONFLICT, ex.getStatus());
    }

    @Test
    void actualizarDebeLanzarConflictSiOtroTopicoTieneMismoTituloYMensaje() {
        var usuario = new Usuario(1L, "Angel", "angel@forohub.com", "encoded");
        var curso = new Curso(1L, "Spring", "Backend");
        var topico = new Topico(10L, "Viejo", "Viejo mensaje", LocalDateTime.now(), StatusTopico.NO_RESPONDIDO, usuario,
                curso);
        var datos = new DatosActualizarTopico("Nuevo", "Nuevo mensaje", null, StatusTopico.SOLUCIONADO);

        when(topicoRepository.findById(10L)).thenReturn(Optional.of(topico));
        when(topicoRepository.existsByTituloAndMensajeAndIdNot("Nuevo", "Nuevo mensaje", 10L)).thenReturn(true);

        ApiException ex = assertThrows(ApiException.class, () -> topicoService.actualizar(10L, datos));

        assertEquals(HttpStatus.CONFLICT, ex.getStatus());
    }
}
