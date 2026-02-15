package com.forohub.foroHub.application.service;

import com.forohub.foroHub.domain.usuario.DatosAutenticacion;
import com.forohub.foroHub.domain.usuario.DatosRegistroUsuario;
import com.forohub.foroHub.domain.usuario.Usuario;
import com.forohub.foroHub.domain.usuario.UsuarioRepository;
import com.forohub.foroHub.infra.errores.ApiException;
import com.forohub.foroHub.infra.security.DatosLoginRespuesta;
import com.forohub.foroHub.infra.security.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, TokenService tokenService,
            UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public DatosLoginRespuesta autenticar(DatosAutenticacion datosAutenticacion) {
        var authToken = new UsernamePasswordAuthenticationToken(datosAutenticacion.login(), datosAutenticacion.clave());
        var usuarioAutenticado = authenticationManager.authenticate(authToken);
        var usuario = (Usuario) usuarioAutenticado.getPrincipal();
        var jwtToken = tokenService.generarToken(usuario);
        return new DatosLoginRespuesta(jwtToken, usuario.getNombre(), usuario.getEmail());
    }

    @Transactional
    public Map<String, String> registrar(DatosRegistroUsuario datosRegistro) {
        if (usuarioRepository.existsByEmail(datosRegistro.email())) {
            throw new ApiException(HttpStatus.CONFLICT, "El email ya esta registrado");
        }
        var usuario = new Usuario(null, datosRegistro.nombre(), datosRegistro.email(),
                passwordEncoder.encode(datosRegistro.clave()));
        usuarioRepository.save(usuario);
        return Map.of("mensaje", "Usuario registrado exitosamente");
    }
}
