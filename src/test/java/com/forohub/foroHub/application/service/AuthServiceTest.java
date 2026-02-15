package com.forohub.foroHub.application.service;

import com.forohub.foroHub.domain.usuario.DatosAutenticacion;
import com.forohub.foroHub.domain.usuario.DatosRegistroUsuario;
import com.forohub.foroHub.domain.usuario.Usuario;
import com.forohub.foroHub.domain.usuario.UsuarioRepository;
import com.forohub.foroHub.infra.errores.ApiException;
import com.forohub.foroHub.infra.security.TokenService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private TokenService tokenService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void registrarDebeLanzarConflictSiEmailYaExiste() {
        var datos = new DatosRegistroUsuario("Angel", "angel@forohub.com", "123456");
        when(usuarioRepository.existsByEmail(datos.email())).thenReturn(true);

        ApiException ex = assertThrows(ApiException.class, () -> authService.registrar(datos));

        assertEquals(HttpStatus.CONFLICT, ex.getStatus());
    }

    @Test
    void autenticarDebeRetornarTokenYDatosUsuario() {
        var usuario = new Usuario(1L, "Angel", "angel@forohub.com", "encoded");
        var authResponse = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
        when(authenticationManager.authenticate(any())).thenReturn(authResponse);
        when(tokenService.generarToken(usuario)).thenReturn("jwt-token");

        var result = authService.autenticar(new DatosAutenticacion("angel@forohub.com", "123456"));

        assertEquals("jwt-token", result.token());
        assertEquals("Angel", result.nombre());
        assertEquals("angel@forohub.com", result.email());
    }

    @Test
    void registrarDebeGuardarUsuarioConClaveEncriptada() {
        var datos = new DatosRegistroUsuario("Angel", "angel@forohub.com", "123456");
        when(usuarioRepository.existsByEmail(datos.email())).thenReturn(false);
        when(passwordEncoder.encode(datos.clave())).thenReturn("encoded");

        authService.registrar(datos);

        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }
}
