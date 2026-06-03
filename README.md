# Apex Flow — Backend + Frontend (local demo)

Instrucciones rápidas para correr el backend con MongoDB y usar la app frontend local.

1) Instalar dependencias e iniciar backend (Node.js necesario):

```bash
cd path/to/billing-inventory-app
npm install
# Opcional: exporta MONGODB_URI si usas Mongo Atlas
export MONGODB_URI='your-mongo-uri'
npm run dev    # usa nodemon en desarrollo
```

2) Backend ofrece endpoints GET/POST en `/api/*` (ej: `/api/products`).

3) Frontend se sirve abriendo `index.html` en un navegador (o servir con `npx http-server`). La app intentará obtener datos desde `http://localhost:4000/api/...`. Si no hay backend disponible, seguirá usando `localStorage` como antes.

Notas:
- Para usar Mongo Atlas, define `MONGODB_URI` con la cadena de conexión.
- Hay un endpoint `/api/seed` que puede recibir objetos `users, clients, products, services, appointments, invoices` para inicializar la DB (útil durante desarrollo).

## Despliegue en Render

Este repo puede desplegarse como un servicio web en Render, y el mismo `server.js` servirá el frontend estático y la API.

1) Entra a https://render.com y crea una cuenta si no tienes.
2) Conecta tu repositorio `Cleomig/programa-de-facturas-`.
3) Crea un nuevo servicio de tipo `Web Service`.
4) Configura:
   - Branch: `main`
   - Build Command: `npm install`
   - Start Command: `npm start`
5) Agrega una variable de entorno en Render:
   - `MONGODB_URI` = tu cadena de conexión a Atlas
6) Despliega el servicio.

Cuando termine, Render te entregará una URL pública del estilo `https://<nombre>.onrender.com`.

### Notas para Render

- El servidor usa `process.env.PORT`, así que Render asignará el puerto automáticamente.
- NO incluyas tu `.env` en GitHub; usa `render.yaml` en el repo y variables de entorno en el panel de Render.
- Si tu red bloquea DNS SRV, usa la cadena sin `+srv` que ya probamos y funciona.

## Archivos nuevos

- `.gitignore`: ignora `node_modules`, `.env` y otros archivos locales.
- `render.yaml`: configuración básica para desplegar en Render.
