package com.forohub.foroHub.infra.errores;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.List;

@RestControllerAdvice
public class TratadorDeErrores {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiError> tratarApiException(ApiException e, HttpServletRequest request) {
        return construirError(e.getStatus().value(), e.getStatus().getReasonPhrase(), e.getMessage(), request,
                e.getDetails());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> tratarErrorValidacion(MethodArgumentNotValidException e, HttpServletRequest request) {
        List<DatosErrorValidacion> errores = e.getFieldErrors().stream().map(DatosErrorValidacion::new).toList();
        return construirError(400, "Bad Request", "Datos de entrada invalidos", request, errores);
    }

    @ExceptionHandler({ BadCredentialsException.class, UsernameNotFoundException.class })
    public ResponseEntity<ApiError> tratarErrorAutenticacion(HttpServletRequest request) {
        return construirError(401, "Unauthorized", "Credenciales invalidas", request, null);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiError> tratarErrorPermisos(HttpServletRequest request) {
        return construirError(403, "Forbidden", "No tienes permisos para realizar esta operacion", request, null);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> tratarErrorGeneral(HttpServletRequest request) {
        return construirError(500, "Internal Server Error", "Error interno del servidor", request, null);
    }

    private ResponseEntity<ApiError> construirError(int status, String error, String message, HttpServletRequest request,
            Object details) {
        ApiError apiError = new ApiError(
                Instant.now(),
                status,
                error,
                message,
                request.getRequestURI(),
                details);
        return ResponseEntity.status(status).body(apiError);
    }

    private record DatosErrorValidacion(String campo, String error) {
        public DatosErrorValidacion(FieldError error) {
            this(error.getField(), error.getDefaultMessage());
        }
    }
}
