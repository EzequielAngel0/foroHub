# Documentacion API de ForoHub

Base URL: `http://localhost:8080`

## Autenticacion

### POST `/login`

Request:

```json
{
  "login": "admin@forohub.com",
  "clave": "123456"
}
```

Response `200`:

```json
{
  "token": "jwt-token",
  "nombre": "Admin",
  "email": "admin@forohub.com"
}
```

### POST `/login/registro`

Request:

```json
{
  "nombre": "Nuevo Usuario",
  "email": "nuevo@forohub.com",
  "clave": "123456"
}
```

Response `200`:

```json
{
  "mensaje": "Usuario registrado exitosamente"
}
```

## Cursos

### GET `/cursos`

Requiere `Authorization: Bearer <token>`.

Response `200`:

```json
{
  "content": [
    { "id": 1, "nombre": "Spring Boot 3", "categoria": "Backend" }
  ]
}
```

## Topicos

Todos los endpoints requieren `Authorization: Bearer <token>`.

### GET `/topicos`

Query params:

- `page` (default `0`)
- `size` (default `10`)
- `sort` (default `fechaCreacion,desc`)

### POST `/topicos`

Request:

```json
{
  "titulo": "Pregunta sobre JPA",
  "mensaje": "Como optimizar esta consulta?",
  "idCurso": 1
}
```

Response `201`:

```json
{
  "id": 10,
  "titulo": "Pregunta sobre JPA",
  "mensaje": "Como optimizar esta consulta?",
  "fechaCreacion": "2026-02-15T06:00:00",
  "status": "NO_RESPONDIDO",
  "autor": "Admin",
  "curso": "Spring Boot 3"
}
```

### GET `/topicos/{id}`

Response `200`: detalle con el mismo formato del response de creacion.

### PUT `/topicos/{id}`

Request:

```json
{
  "titulo": "Pregunta actualizada",
  "mensaje": "Mensaje actualizado",
  "idCurso": 1,
  "status": "SOLUCIONADO"
}
```

### DELETE `/topicos/{id}`

Response `204`.

## Contrato de error

```json
{
  "timestamp": "2026-02-15T06:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Datos de entrada invalidos",
  "path": "/topicos",
  "details": []
}
```

## Codigos mas comunes

- `400` entrada invalida o recurso relacionado faltante
- `401` credenciales invalidas o token invalido
- `403` operacion no permitida
- `404` recurso no encontrado
- `409` conflicto (duplicados)
- `500` error interno no esperado
