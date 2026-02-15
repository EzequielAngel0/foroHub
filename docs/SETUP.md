# Configuracion

## Prerrequisitos

- Java 17+
- Node.js 18+
- MySQL 8+

## Base de datos

Crear base:

```sql
CREATE DATABASE forohub_db;
```

Usuario recomendado y permisos:

```sql
CREATE USER 'forohub_user'@'localhost' IDENTIFIED BY 'forohub_password';
GRANT ALL PRIVILEGES ON forohub_db.* TO 'forohub_user'@'localhost';
FLUSH PRIVILEGES;
```

## Variables de entorno

Backend:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `API_SECURITY_SECRET`
- `API_SECURITY_ISSUER`
- `API_SECURITY_EXPIRATION_HOURS`
- `APP_CORS_ALLOWED_ORIGINS`

Frontend:

- `VITE_API_BASE_URL`

Ver ejemplos:

- `.env.example`
- `frontend/.env.example`
- `docs/COMMANDS.md` (comandos completos en PowerShell y Bash)

## Ejecucion

Backend:

```bash
./mvnw spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```
