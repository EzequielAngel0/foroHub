# Changelog Interno

## 2026-02-15

### Backend

- Refactor a capa de servicios (`AuthService`, `TopicoService`, `CursoService`)
- Errores de API unificados con `ApiError` y `ApiException`
- Configuracion movida a propiedades por entorno
- Fix de expiracion JWT con `Instant.now() + horas`
- Handlers de seguridad ahora responden JSON en 401/403

### Frontend

- Rediseno completo con sistema visual propio
- Mejoras UX en auth y flujos de topicos
- Notificaciones estabilizadas con deduplicacion
- Mensaje de auth preservado tras redireccion a login
- Modal global reutilizable para confirmaciones

### Documentacion

- Reorganizacion completa en `README.md + docs/` por secciones
