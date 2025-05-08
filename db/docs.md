# Esquema

```
// data base
MATCH (n) DETACH DELETE n;

// ubicaciones
MERGE (u:Ubicacion {nombre: "CIT Segundo nivel"})
SET u.lat = 14.605, u.lon = -90.49;

// restaurantes
MERGE (r:Restaurante {nombre: "Restaurante1"})
WITH r
MATCH (u:Ubicacion {nombre: "CIT Segundo nivel"})
MERGE (r)-[:LOCATED_AT]->(u);

// productos
MERGE (px:Producto {nombre: "ComidaX", tipo: "comida", precio: 80.0});
MERGE (py:Producto {nombre: "ComidaY", tipo: "comida", precio: 95.0});
MERGE (pz:Producto {nombre: "ComidaZ", tipo: "comida", precio: 75.0});
MERGE (pw:Producto {nombre: "ComidaW", tipo: "comida", precio: 110.0});

MATCH (r:Restaurante {nombre: "Go green"})
MATCH (px:Producto {nombre: "ComidaX"})
MATCH (py:Producto {nombre: "ComidaY"})
MATCH (pz:Producto {nombre: "ComidaZ"})
MATCH (pw:Producto {nombre: "ComidaW"})
MERGE (r)-[:OFRECE]->(px)
MERGE (r)-[:OFRECE]->(py)
MERGE (r)-[:OFRECE]->(pz)
MERGE (r)-[:OFRECE]->(pw);

// user 1: likes
MERGE (u1:Usuario {id: "usuario1", nombre: "user 1"})
WITH u1
MATCH (px:Producto {nombre: "ComidaX"})
MATCH (py:Producto {nombre: "ComidaY"})
MERGE (u1)-[:LIKE {fecha: datetime('2025-03-15')}]->(px)
MERGE (u1)-[:LIKE {fecha: datetime('2025-03-20')}]->(py);

// usuario 2: likes
MERGE (u2:Usuario {id: "usuario2", nombre: "user 2"})
WITH u2
MATCH (px:Producto {nombre: "ComidaX"})
MATCH (py:Producto {nombre: "ComidaY"})
MATCH (pz:Producto {nombre: "ComidaZ"})
MERGE (u2)-[:LIKE {fecha: datetime('2025-03-12')}]->(px)
MERGE (u2)-[:LIKE {fecha: datetime('2025-03-18')}]->(py)
MERGE (u2)-[:LIKE {fecha: datetime('2025-04-02')}]->(pz);

// usuario 3: likes
MERGE (u3:Usuario {id: "usuario3", nombre: "user 3"})
WITH u3
MATCH (px:Producto {nombre: "ComidaX"})
MATCH (pz:Producto {nombre: "ComidaZ"})
MERGE (u3)-[:LIKE {fecha: datetime('2025-03-10')}]->(px)
MERGE (u3)-[:LIKE {fecha: datetime('2025-03-22')}]->(pz);

// usuario 4: likes
MERGE (u4:Usuario {id: "usuario4", nombre: "user 4"})
WITH u4
MATCH (py:Producto {nombre: "ComidaY"})
MATCH (pz:Producto {nombre: "ComidaZ"})
MATCH (pw:Producto {nombre: "ComidaW"})
MERGE (u4)-[:LIKE {fecha: datetime('2025-03-15')}]->(py)
MERGE (u4)-[:LIKE {fecha: datetime('2025-03-28')}]->(pz)
MERGE (u4)-[:LIKE {fecha: datetime('2025-04-05')}]->(pw);

// usuario 5: likes
MERGE (u5:Usuario {id: "usuario5", nombre: "user 5"})
WITH u5
MATCH (px:Producto {nombre: "ComidaX"})
MATCH (pw:Producto {nombre: "ComidaW"})
MERGE (u5)-[:LIKE {fecha: datetime('2025-03-25')}]->(px)
MERGE (u5)-[:LIKE {fecha: datetime('2025-04-01')}]->(pw);
```
