package com.forohub.foroHub.controller;

import com.forohub.foroHub.application.service.TopicoService;
import com.forohub.foroHub.domain.topico.DatosActualizarTopico;
import com.forohub.foroHub.domain.topico.DatosListadoTopico;
import com.forohub.foroHub.domain.topico.DatosRegistroTopico;
import com.forohub.foroHub.domain.topico.DatosRespuestaTopico;
import com.forohub.foroHub.domain.usuario.Usuario;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/topicos")
public class TopicoController {

    private final TopicoService topicoService;

    public TopicoController(TopicoService topicoService) {
        this.topicoService = topicoService;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<DatosRespuestaTopico> registrarTopico(@RequestBody @Valid DatosRegistroTopico datosRegistro,
            UriComponentsBuilder uriComponentsBuilder) {
        var topico = topicoService.crear(datosRegistro, usuarioAutenticado());
        URI url = uriComponentsBuilder.path("/topicos/{id}").buildAndExpand(topico.id()).toUri();
        return ResponseEntity.created(url).body(topico);
    }

    @GetMapping
    public ResponseEntity<Page<DatosListadoTopico>> listadoTopicos(
            @PageableDefault(size = 10, sort = "fechaCreacion") Pageable paginacion) {
        return ResponseEntity.ok(topicoService.listar(paginacion));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatosRespuestaTopico> retornaDatosTopico(@PathVariable("id") Long id) {
        return ResponseEntity.ok(topicoService.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<DatosRespuestaTopico> actualizarTopico(@PathVariable("id") Long id,
            @RequestBody @Valid DatosActualizarTopico datosActualizarTopico) {
        return ResponseEntity.ok(topicoService.actualizar(id, datosActualizarTopico));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> eliminarTopico(@PathVariable("id") Long id) {
        topicoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    private Usuario usuarioAutenticado() {
        return (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
