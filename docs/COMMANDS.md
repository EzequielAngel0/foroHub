# Comandos del Proyecto

Este documento concentra los comandos necesarios para usar ForoHub.

## 1) Levantar backend con variables de entorno (PowerShell)

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/forohub_db"
$env:DB_USERNAME="forohub_user"
$env:DB_PASSWORD="<tu_password_mysql>"
$env:API_SECURITY_SECRET="cambia-este-secreto"
$env:API_SECURITY_ISSUER="forohub"
$env:API_SECURITY_EXPIRATION_HOURS="2"
$env:APP_CORS_ALLOWED_ORIGINS="http://localhost:5173,http://localhost:5174"
.\mvnw spring-boot:run
```

## 2) Levantar backend con variables de entorno (Bash)

```bash
export DB_URL="jdbc:mysql://localhost:3306/forohub_db"
export DB_USERNAME="forohub_user"
export DB_PASSWORD="<tu_password_mysql>"
export API_SECURITY_SECRET="cambia-este-secreto"
export API_SECURITY_ISSUER="forohub"
export API_SECURITY_EXPIRATION_HOURS="2"
export APP_CORS_ALLOWED_ORIGINS="http://localhost:5173,http://localhost:5174"
./mvnw spring-boot:run
```

## 3) Levantar frontend

```bash
cd frontend
npm install
npm run dev
```

## 4) Configurar URL de API en frontend

PowerShell:

```powershell
$env:VITE_API_BASE_URL="http://localhost:8080"
cd frontend
npm run dev
```

Bash:

```bash
export VITE_API_BASE_URL="http://localhost:8080"
cd frontend
npm run dev
```

## 5) Comandos de pruebas

Backend:

```bash
./mvnw test
```

Frontend lint:

```bash
cd frontend
npm run lint
```

Frontend build:

```bash
cd frontend
npm run build
```

## 6) Arranque limpio (cuando hay errores de cache/devtools)

PowerShell:

```powershell
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force
.\mvnw clean spring-boot:run
```

## 7) Crear base y usuario MySQL (opcional)

```sql
CREATE DATABASE forohub_db;
CREATE USER 'forohub_user'@'localhost' IDENTIFIED BY '<tu_password_mysql>';
GRANT ALL PRIVILEGES ON forohub_db.* TO 'forohub_user'@'localhost';
FLUSH PRIVILEGES;
```

## 8) Login de prueba

- Email: `admin@forohub.com`
- Password: `123456`
