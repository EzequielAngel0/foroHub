# API

Base URL: `http://localhost:8080`

## Endpoints publicos

- `POST /login`
- `POST /login/registro`

## Endpoints protegidos

- `GET /cursos`
- `GET /topicos`
- `POST /topicos`
- `GET /topicos/{id}`
- `PUT /topicos/{id}`
- `DELETE /topicos/{id}`

## Ejemplo de login

```json
{
  "login": "admin@forohub.com",
  "clave": "123456"
}
```

## Formato de error estandar

```json
{
  "timestamp": "2026-02-15T06:00:00Z",
  "status": 401,
  "error": "Unauthorized",
  "message": "Token invalido o expirado",
  "path": "/topicos",
  "details": null
}
```

Referencias ampliadas:

- `docs/API_DOCS.md`
- `docs/api_spec.md`
