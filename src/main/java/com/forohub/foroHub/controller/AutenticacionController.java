package com.forohub.foroHub.controller;

import com.forohub.foroHub.application.service.AuthService;
import com.forohub.foroHub.domain.usuario.DatosAutenticacion;
import com.forohub.foroHub.domain.usuario.DatosRegistroUsuario;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class AutenticacionController {

    private final AuthService authService;

    public AutenticacionController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<?> autenticarUsuario(@RequestBody @Valid DatosAutenticacion datosAutenticacion) {
        return ResponseEntity.ok(authService.autenticar(datosAutenticacion));
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody @Valid DatosRegistroUsuario datosRegistro) {
        return ResponseEntity.ok(authService.registrar(datosRegistro));
    }
}
