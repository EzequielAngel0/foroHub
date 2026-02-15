package com.forohub.foroHub.controller;

import com.forohub.foroHub.application.service.CursoService;
import com.forohub.foroHub.domain.curso.DatosListadoCurso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @GetMapping
    public ResponseEntity<Page<DatosListadoCurso>> listadoCursos(@PageableDefault(size = 10) Pageable paginacion) {
        return ResponseEntity.ok(cursoService.listar(paginacion));
    }
}
