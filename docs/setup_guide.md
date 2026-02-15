# Guia de Configuracion de ForoHub

## Resumen

ForoHub es una aplicacion de foro con backend en Spring Boot y frontend en React.

## Prerrequisitos

- Java 17+
- Maven 3.8+
- Node.js 18+
- MySQL 8+

## 1. Configurar base de datos

1. Abrir terminal o MySQL Workbench.
2. Ejecutar script `docs/database/setup.sql`:

```bash
mysql -u root -p < docs/database/setup.sql
```

3. Crear usuario admin para pruebas de login:

```bash
mysql -u root -p forohub_db < docs/database/insert_admin.sql
```

Credenciales iniciales: `admin@forohub.com` / `123456`

4. Revisar `src/main/resources/application.properties` y validar credenciales de DB.

## 2. Levantar backend

```bash
./mvnw spring-boot:run
```

Backend por defecto en `http://localhost:8080`.

## 3. Levantar frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend por defecto en `http://localhost:5173`.

## 4. Pruebas basicas

- Login con usuario admin
- Crear, listar y eliminar topicos desde la UI
