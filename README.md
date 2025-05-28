# Food Recommendations P2

Este proyecto es una plataforma de recomendaciones de comida que permite a los usuarios explorar menús de diferentes restaurantes, dar "like" a productos, y recibir recomendaciones personalizadas. Utiliza Next.js, Neo4j como base de datos y una arquitectura modular para el backend y frontend.

## Descripción

La aplicación permite:
- Listar restaurantes y sus productos.
- Dar "like" a productos y ver los más populares.
- Registrar y autenticar usuarios.
- Obtener recomendaciones personalizadas basadas en los likes de los usuarios.

## Distribución del Proyecto

```
├── components/                # Componentes reutilizables de React
│   ├── gird-products.tsx
│   ├── navbar.tsx
│   └── product-card.tsx
│   └── ui/                    # Componentes UI (botones, tarjetas, formularios, etc.)
├── db/                        # Documentación y esquemas de la base de datos
│   ├── docs.md
│   └── user-based.md
├── menus_restaurantes/        # Menús de restaurantes en formato JSON
├── public/                    # Archivos estáticos e imágenes
├── src/
│   ├── app/
│   │   ├── api/               # Endpoints API (Next.js Route Handlers)
│   │   │   ├── products/
│   │   │   ├── restaurant/
│   │   │   └── user/
│   │   ├── lib/               # Conexión a Neo4j y utilidades
│   │   ├── login/             # Página de login
│   │   ├── register/          # Página de registro
│   │   └── restaurant/        # Página principal de restaurantes
│   ├── components/            # Componentes compartidos
│   ├── lib/                   # Utilidades generales
│   └── stores/                # Manejo de estado global
├── next.config.ts             # Configuración de Next.js
├── package.json               # Dependencias y scripts
├── tsconfig.json              # Configuración de TypeScript
└── README.md                  # Este archivo
```

## API Endpoints principales

- **Restaurantes**
  - `GET /api/restaurant/get-all` — Lista todos los restaurantes.
  - `POST /api/restaurant/get-products` — Obtiene los productos de un restaurante.
  - `POST /api/restaurant/add-products` — Agrega productos a un restaurante.
  - `POST /api/restaurant/create-restaurant` — Crea un nuevo restaurante.
  - `DELETE /api/restaurant/delete-restaurant` — Elimina un restaurante.

- **Productos**
  - `GET /api/products/get-products-more-likes` — Obtiene productos con más likes.
  - `DELETE /api/products/delete-product` — Elimina un producto.

- **Usuarios**
  - `POST /api/user/create-user` — Crea un usuario.
  - `POST /api/user/login` — Login de usuario.
  - `POST /api/user/register` — Registro de usuario.
  - `DELETE /api/user/delete-user` — Elimina un usuario.
  - `POST /api/user/user-like-product` — Da like a un producto.
  - `POST /api/user/check-user-like` — Verifica si un usuario ya dio like a un producto.
  - `POST /api/user/get-recomendations` — Obtiene recomendaciones personalizadas.

## Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/angcoder-c/Food-Recommendations-P2.git
   cd Food-Recommendations-P2
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura la base de datos Neo4j:**
   - Asegúrate de tener Neo4j corriendo y configura la conexión en `src/app/lib/neo4j.ts`.

4. **Configura dominios de imágenes externos (si usas Next.js Image):**
   - Agrega los dominios necesarios en `next.config.ts`:
     ```js
     images: {
       domains: ['grupogogreen.com', 'wendysmx.net'],
     },
     ```

5. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

6. **Abre la aplicación:**
   - Ve a [http://localhost:3000](http://localhost:3000)

## Documentación adicional


**1. Base de datos**

- [Definición de esquema de base de dato](https://github.com/angcoder-c/Food-Recommendations-P2/blob/main/db/docs.md)

- [Algoritmo de recomendaciones user-based](./db/user-based.md)

## Referencias de componentes:
- 
¡Contribuciones y sugerencias son bienvenidas!


