package com.forohub.foroHub.application.service;

import com.forohub.foroHub.domain.curso.Curso;
import com.forohub.foroHub.domain.curso.CursoRepository;
import com.forohub.foroHub.domain.topico.DatosActualizarTopico;
import com.forohub.foroHub.domain.topico.DatosListadoTopico;
import com.forohub.foroHub.domain.topico.DatosRegistroTopico;
import com.forohub.foroHub.domain.topico.DatosRespuestaTopico;
import com.forohub.foroHub.domain.topico.Topico;
import com.forohub.foroHub.domain.topico.TopicoRepository;
import com.forohub.foroHub.domain.usuario.Usuario;
import com.forohub.foroHub.infra.errores.ApiException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TopicoService {

    private final TopicoRepository topicoRepository;
    private final CursoRepository cursoRepository;

    public TopicoService(TopicoRepository topicoRepository, CursoRepository cursoRepository) {
        this.topicoRepository = topicoRepository;
        this.cursoRepository = cursoRepository;
    }

    @Transactional
    public DatosRespuestaTopico crear(DatosRegistroTopico datosRegistro, Usuario autor) {
        var curso = obtenerCursoOError(datosRegistro.idCurso());
        if (topicoRepository.existsByTituloAndMensaje(datosRegistro.titulo(), datosRegistro.mensaje())) {
            throw new ApiException(HttpStatus.CONFLICT, "Ya existe un topico con el mismo titulo y mensaje");
        }

        var topico = new Topico(datosRegistro.titulo(), datosRegistro.mensaje(), autor, curso);
        topicoRepository.save(topico);
        return new DatosRespuestaTopico(topico);
    }

    public Page<DatosListadoTopico> listar(Pageable paginacion) {
        return topicoRepository.findAll(paginacion).map(DatosListadoTopico::new);
    }

    public DatosRespuestaTopico obtenerPorId(Long id) {
        var topico = topicoRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Topico no encontrado"));
        return new DatosRespuestaTopico(topico);
    }

    @Transactional
    public DatosRespuestaTopico actualizar(Long id, DatosActualizarTopico datosActualizarTopico) {
        var topico = topicoRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Topico no encontrado"));

        var nuevoTitulo = datosActualizarTopico.titulo() != null ? datosActualizarTopico.titulo() : topico.getTitulo();
        var nuevoMensaje = datosActualizarTopico.mensaje() != null ? datosActualizarTopico.mensaje() : topico.getMensaje();

        if (topicoRepository.existsByTituloAndMensajeAndIdNot(nuevoTitulo, nuevoMensaje, id)) {
            throw new ApiException(HttpStatus.CONFLICT, "Ya existe un topico con el mismo titulo y mensaje");
        }

        Curso curso = null;
        if (datosActualizarTopico.idCurso() != null) {
            curso = obtenerCursoOError(datosActualizarTopico.idCurso());
        }

        topico.actualizarDatos(datosActualizarTopico, curso);
        return new DatosRespuestaTopico(topico);
    }

    @Transactional
    public void eliminar(Long id) {
        if (!topicoRepository.existsById(id)) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Topico no encontrado");
        }
        topicoRepository.deleteById(id);
    }

    private Curso obtenerCursoOError(Long idCurso) {
        return cursoRepository.findById(idCurso)
                .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "El curso especificado no existe"));
    }
}
