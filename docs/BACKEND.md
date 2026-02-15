# Backend

## Paquetes principales

- `controller`
- `application/service`
- `domain/*`
- `infra/security`
- `infra/errores`

## Servicios core

- `AuthService`
  - login
  - registro
- `TopicoService`
  - crear/listar/detalle/actualizar/eliminar topicos
  - validaciones de duplicados
- `CursoService`
  - listado de cursos

## Persistencia

- Repositorios JPA para usuarios, topicos y cursos
- Flyway para migraciones en:
  - `src/main/resources/db/migration`

## Modelo de error

Error de API unificado:

- `timestamp`
- `status`
- `error`
- `message`
- `path`
- `details`
