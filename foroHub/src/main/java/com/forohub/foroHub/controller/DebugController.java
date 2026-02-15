package com.forohub.foroHub.controller;

import com.forohub.foroHub.domain.usuario.Usuario;
import com.forohub.foroHub.domain.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/debug")
public class DebugController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/users")
    public List<Usuario> listUsers() {
        return usuarioRepository.findAll();
    }
}
