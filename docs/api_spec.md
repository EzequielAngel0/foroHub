# Especificacion API de ForoHub

## Estrategia de versionado

La version actual no esta versionada en URL y mantiene compatibilidad con el frontend existente.

## Endpoints

### Auth

- `POST /login`
- `POST /login/registro`

### Cursos

- `GET /cursos`

### Topicos

- `GET /topicos`
- `POST /topicos`
- `GET /topicos/{id}`
- `PUT /topicos/{id}`
- `DELETE /topicos/{id}`

## Seguridad

- JWT Bearer token
- Sesion stateless
- Rutas publicas: `/login`, `/login/registro`
- CORS configurable por `APP_CORS_ALLOWED_ORIGINS`

## Reglas de validacion

- Registro de usuario:
  - `nombre`: obligatorio
  - `email`: obligatorio y valido
  - `clave`: obligatoria, min 6, max 100
- Creacion de topico:
  - `titulo`: obligatorio, max 100
  - `mensaje`: obligatorio, max 255
  - `idCurso`: obligatorio
- Actualizacion de topico:
  - `titulo`: opcional, max 100
  - `mensaje`: opcional, max 255
  - `idCurso`: opcional
  - `status`: opcional (enum)

## Restricciones de dominio

- Email de usuario unico
- Combinacion (`titulo`, `mensaje`) de topico unica
- El curso del topico debe existir
- El id del topico debe existir para leer/editar/eliminar

## Modelo de error

```json
{
  "timestamp": "ISO-8601 instant",
  "status": 409,
  "error": "Conflict",
  "message": "Mensaje legible",
  "path": "/request-path",
  "details": null
}
```

`details` se usa para errores de validacion por campo.

## Matriz de codigos HTTP

- `200 OK`: lectura/login/registro/actualizacion exitosa
- `201 Created`: creacion de topico exitosa
- `204 No Content`: eliminacion exitosa
- `400 Bad Request`: validacion o entidad relacionada faltante
- `401 Unauthorized`: auth/token invalido
- `403 Forbidden`: autorizacion denegada
- `404 Not Found`: entidad no encontrada
- `409 Conflict`: duplicados
- `500 Internal Server Error`: error inesperado
