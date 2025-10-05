
# MarathonStats (Frontend)

SPA en Vue 3 (Vite + Composition API + Router + Pinia + Axios). Solo Frontend.

## Requisitos
- Node 18+

## Ejecutar
```bash
npm i
npm run dev
```
La API debe estar en `http://localhost:3000` con rutas:
- `GET/POST/PUT/DELETE /ciudades`
- `GET/POST/PUT/DELETE /atletas`

## Notas
- Listado de atletas ordenado por `posicion` asc y resaltado del **podio** con `PodiumBadge`.
- Filtro por ciudad en el listado de atletas.
- Validaciones en formularios, `window.confirm` al eliminar.
- Estilos simples en `src/style.css`.
```
