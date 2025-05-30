# Food Recommendations P2

Este proyecto es una plataforma de recomendaciones de comida que permite a los usuarios explorar menús de diferentes restaurantes, dar "like" a productos, y recibir recomendaciones personalizadas. Utiliza Next.js, Neo4j como base de datos y una arquitectura modular para el backend y frontend.

## Descripción

La aplicación permite:
- Listar restaurantes y sus productos.
- Dar "like" a productos y ver los más populares.
- Registrar y autenticar usuarios.
- Obtener recomendaciones personalizadas basadas en los likes de los usuarios.

## Distribución del Proyecto

```plaintext
📦 
├─ .gitignore
├─ README.md
├─ components.json
├─ db
│  ├─ docs.md
│  └─ user-based.md
├─ menus_restaurantes
│  ├─ &Cafe.json
│  ├─ Barista.json
│  ├─ Gitane.json
│  ├─ GoGreen.json
│  └─ Panitos.json
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ logoback.png
│  ├─ logopng.png
│  ├─ next.svg
│  ├─ uvgLogo.png
│  ├─ vercel.svg
│  └─ window.svg
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  ├─ ping
│  │  │  │  └─ route.ts
│  │  │  ├─ products
│  │  │  │  ├─ delete-product
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ get-products-more-likes
│  │  │  │     └─ route.ts
│  │  │  ├─ restaurant
│  │  │  │  ├─ add-products
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ create-restaurant
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ delete-restaurant
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ get-all
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ get-products
│  │  │  │     └─ route.ts
│  │  │  └─ user
│  │  │     ├─ check-user-like
│  │  │     │  └─ route.ts
│  │  │     ├─ create-user
│  │  │     │  └─ route.ts
│  │  │     ├─ delete-user
│  │  │     │  └─ route.ts
│  │  │     ├─ get-recomendations
│  │  │     │  └─ route.ts
│  │  │     ├─ get-users
│  │  │     │  └─ route.ts
│  │  │     ├─ login
│  │  │     │  └─ route.ts
│  │  │     ├─ register
│  │  │     │  └─ route.ts
│  │  │     └─ user-like-product
│  │  │        └─ route.ts
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ lib
│  │  │  └─ neo4j.ts
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ register
│  │  │  └─ page.tsx
│  │  └─ restaurant
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ gird-products.tsx
│  │  ├─ navbar.tsx
│  │  ├─ product-card.tsx
│  │  └─ ui
│  │     ├─ badge.tsx
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ form.tsx
│  │     ├─ input.tsx
│  │     └─ label.tsx
│  ├─ lib
│  │  └─ utils.ts
│  └─ stores
│     └─ useAuthStore.ts
└─ tsconfig.json
```

## API Endpoints principales

- **Restaurantes**
  - `GET /api/restaurant/get-all`
    - **Descripción:** Lista todos los restaurantes.
    - **Body:** _No requiere._
    - **Respuesta:** `["Barista", "Gitane", ...]`

  - `POST /api/restaurant/get-products`
    - **Descripción:** Obtiene los productos de un restaurante.
    - **Body:**
      ```json
      { "nombre": "Barista" }
      ```
    - **Respuesta:**
      ```json
      {
        "restaurante": "Barista",
        "productos": [
          { "nombre": "Café Latte", "tipo": "bebida", "precio": 25, "img": "url", "likes": 3 },
          ...
        ]
      }
      ```

  - `POST /api/restaurant/add-products`
    - **Descripción:** Agrega productos a un restaurante.
    - **Body:**
      ```json
      {
        "nombre": "Barista",
        "productos": [
          { "nombre": "Nuevo Producto", "tipo": "comida", "precio": 50, "img": "url" }
        ]
      }
      ```

  - `POST /api/restaurant/create-restaurant`
    - **Descripción:** Crea un nuevo restaurante.
    - **Body:**
      ```json
      { "nombre": "NuevoRestaurante" }
      ```

  - `DELETE /api/restaurant/delete-restaurant`
    - **Descripción:** Elimina un restaurante.
    - **Body:**
      ```json
      { "nombre": "Barista" }
      ```

- **Productos**
  - `GET /api/products/get-products-more-likes`
    - **Descripción:** Obtiene productos con más likes.
    - **Body:** _No requiere._
    - **Respuesta:**
      ```json
      [
        { "nombre": "Café Latte", "tipo": "bebida", "precio": 25, "img": "url", "likes": 10, "restaurante": "Barista" },
        ...
      ]
      ```

  - `DELETE /api/products/delete-product`
    - **Descripción:** Elimina un producto.
    - **Body:**
      ```json
      { "nombre": "Café Latte" }
      ```

- **Usuarios**
  - `POST /api/user/create-user`
    - **Descripción:** Crea un usuario.
    - **Body:**
      ```json
      { "id": "123", "nombre": "Juan", "correo": "juan@mail.com", "password": "1234" }
      ```

  - `POST /api/user/login`
    - **Descripción:** Login de usuario.
    - **Body:**
      ```json
      { "correo": "juan@mail.com", "password": "1234" }
      ```

  - `POST /api/user/register`
    - **Descripción:** Registro de usuario.
    - **Body:**
      ```json
      { "nombre": "Juan", "correo": "juan@mail.com", "password": "1234" }
      ```

  - `DELETE /api/user/delete-user`
    - **Descripción:** Elimina un usuario.
    - **Body:**
      ```json
      { "id": "123" }
      ```

  - `POST /api/user/user-like-product`
    - **Descripción:** Da like a un producto.
    - **Body:**
      ```json
      { "usuarioId": "123", "productoNombre": "Café Latte" }
      ```

  - `POST /api/user/check-user-like`
    - **Descripción:** Verifica si un usuario ya dio like a un producto.
    - **Body:**
      ```json
      { "usuarioId": "123", "productoNombre": "Café Latte" }
      ```
    - **Respuesta:**
      ```json
      { "hasLiked": true, "usuarioId": "123", "productoNombre": "Café Latte" }
      ```

  - `POST /api/user/get-recomendations`
    - **Descripción:** Obtiene recomendaciones personalizadas para un usuario.
    - **Body:**
      ```json
      { "usuarioId": "123" }
      ```
    - **Respuesta:**
      ```json
      [
        { "nombre": "Café Mocha", "tipo": "bebida", "precio": 30, "img": "url", "restaurante": "Barista" },
        ...
      ]
      ```

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




## Link al proyecto por vercel:
  [recomendation-page](https://food-recommendations-p2.vercel.app/)
## Referencias de componentes:
**2. Componentes obtenidos de:**
- Front desarrollado en base a los componentes de: [Shadcn](https://ui.shadcn.com/) 


