# Pruebas

## Backend

Ejecutar:

```bash
./mvnw test
```

Pruebas unitarias clave:

- `AuthServiceTest`
- `TopicoServiceTest`

Nota:

- `ForoHubApplicationTests` esta deshabilitada por defecto porque requiere MySQL local activo.

## Frontend

Lint:

```bash
cd frontend
npm run lint
```

Build:

```bash
npm run build
```
