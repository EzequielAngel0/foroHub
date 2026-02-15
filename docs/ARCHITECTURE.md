# Arquitectura

## Vista general

ForoHub usa arquitectura por capas en backend y SPA en frontend:

- Backend: controladores -> servicios -> repositorios
- Frontend: paginas por ruta + componentes/contextos + servicios API

## Capas de backend

- Controladores:
  - mapeo HTTP y transporte
- Servicios:
  - reglas de negocio y orquestacion
- Repositorios:
  - persistencia y consultas
- Infra:
  - seguridad
  - manejo de errores

## Estructura frontend

- `src/pages`: vistas por ruta
- `src/components`: UI reutilizable y providers
- `src/context`: contextos compartidos
- `src/services`: cliente API y helpers

## Flujo de datos

1. El usuario se autentica (`/login`)
2. El JWT se guarda en localStorage
3. Axios inyecta `Authorization`
4. Backend valida token en `SecurityFilter`
5. Controladores delegan en servicios
6. Servicios usan repositorios para persistencia
