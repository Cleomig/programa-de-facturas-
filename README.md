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
