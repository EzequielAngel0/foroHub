# Frontend

## Sistema UI

La UI usa un sistema de diseno en `frontend/src/index.css`:

- tokens (color, espaciado, tipografia)
- clases reutilizables (`panel`, `card`, `btn`, `input`, `status-*`)
- helpers responsive

Tipografia:

- Display: Bebas Neue
- Cuerpo: IBM Plex Sans

## Providers

- `AuthProvider`
- `NotificationProvider`
- `ConfirmDialogProvider` (modal global de confirmacion)

## Dialogo de confirmacion

Reemplaza `window.confirm` con un modal reutilizable y accesible:

- overlay bloqueante
- atajos de teclado:
  - `Esc` cancela
  - `Enter` confirma
- API por promesa:
  - `const ok = await confirm({...})`

## Cliente API

- Agrega JWT automaticamente desde localStorage
- Redirecciona a login en `401`
- Conserva mensaje de auth para mostrarlo en login
