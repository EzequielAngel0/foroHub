# Documentacion de Frontend

## Stack

- React + Vite
- Utilidades Tailwind CSS + tokens personalizados en `src/index.css`
- React Router
- Axios

## Entorno

Crear `.env` desde `.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Direccion visual

- Estilo visual: editorial-tech en tonos calidos
- Tipografia:
  - Display: `Bebas Neue`
  - Cuerpo/UI: `IBM Plex Sans`
- Clases base del sistema:
  - `panel`, `card`, `btn`, `input`, `select`, `textarea`
  - badges: `status-pending`, `status-solved`, `status-danger`, `status-closed`

## Mejoras de UX y rendimiento incluidas

- Estados de carga, vacio y error unificados
- Navegacion movil y responsive mejorada
- Mensajes de error de API normalizados con `getApiErrorMessage`
- Filtrado memoizado y callbacks estables en listado de topicos
- Menos efectos visuales costosos y transiciones mas limpias
