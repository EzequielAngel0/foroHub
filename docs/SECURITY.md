# Seguridad

## Autenticacion

- JWT Bearer token
- Sesiones stateless
- Subject del token = email del usuario

## Propiedades configurables

- `api.security.secret`
- `api.security.issuer`
- `api.security.expiration-hours`
- `app.cors.allowed-origins`

## Filtro de seguridad

- Lee `Authorization: Bearer <token>`
- Valida token
- Carga usuario autenticado
- Si token invalido: limpia contexto y marca `auth_error` en request

## Respuestas de seguridad

Los handlers personalizados devuelven JSON para:

- `401 Unauthorized`
- `403 Forbidden`

Esto permite que el frontend muestre mensajes claros de auth/permisos.
