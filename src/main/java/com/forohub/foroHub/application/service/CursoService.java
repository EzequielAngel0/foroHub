package com.forohub.foroHub.application.service;

import com.forohub.foroHub.domain.curso.CursoRepository;
import com.forohub.foroHub.domain.curso.DatosListadoCurso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CursoService {

    private final CursoRepository cursoRepository;

    public CursoService(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    public Page<DatosListadoCurso> listar(Pageable paginacion) {
        return cursoRepository.findAll(paginacion).map(DatosListadoCurso::new);
    }
}
