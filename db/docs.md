# Esquema y querys Neo4j

## Esquema

```
MATCH (n) DETACH DELETE n;

// ubicaciones
MERGE (u:Ubicacion {nombre: "CIT Segundo nivel"})
SET u.lat = 20.112, u.lon = -99.223;

// restaurantes con ubicación
MERGE (r:Restaurante {nombre: "Go green"})
WITH r
MATCH (u:Ubicacion {nombre: "CIT Segundo nivel"})
MERGE (r)-[:UBICADO_EN]->(u);

// productos
MERGE (px:Producto {nombre: "ComidaX", tipo: "comida"});
MERGE (py:Producto {nombre: "ComidaY", tipo: "comida"});
MERGE (pz:Producto {nombre: "ComidaZ", tipo: "comida"});

// relacion de restaurante con productos
MATCH (r:Restaurante {nombre: "Go green"})
MATCH (px:Producto {nombre: "ComidaX"})
MATCH (py:Producto {nombre: "ComidaY"})
MATCH (pz:Producto {nombre: "ComidaZ"})
MERGE (r)-[:OFRECE]->(px)
MERGE (r)-[:OFRECE]->(py)
MERGE (r)-[:OFRECE]->(pz);

// usuario 1: ComidaX
MERGE (u1:Usuario {id: "usuario1"})
WITH u1
MATCH (px:Producto {nombre: "ComidaX"})
MERGE (u1)-[:LIKE]->(px);

// usuario 2: ComidaX y ComidaY
MERGE (u2:Usuario {id: "usuario2"})
WITH u2
MATCH (px:Producto {nombre: "ComidaX"}), (py:Producto {nombre: "ComidaY"})
MERGE (u2)-[:LIKE]->(px)
MERGE (u2)-[:LIKE]->(py);

// usuario 3: ComidaX y ComidaZ
MERGE (u3:Usuario {id: "usuario3"})
WITH u3
MATCH (px:Producto {nombre: "ComidaX"}), (pz:Producto {nombre: "ComidaZ"})
MERGE (u3)-[:LIKE]->(px)
MERGE (u3)-[:LIKE]->(pz);
```

## querys

### productos por restaurante

```
MATCH (r:Restaurante)-[:OFRECE]->(p:Producto)
RETURN r.nombre AS Restaurante, collect(p.nombre) AS Productos;
```

### Mostrar gustos de un usuario

```
MATCH (u:Usuario {id: "usuario-x"})-[:LIKE]->(p:Producto)
RETURN u.id AS Usuario, collect(p.nombre) AS Gustos;
```

### Collaborative filtering

```
MATCH (ux:Usuario {id: "usuario-x"})-[:LIKE]->(p:Producto)<-[:LIKE]-(uy:Usuario)-[:LIKE]->(rec:Producto)
WHERE NOT (u1)-[:LIKE]->(rec)
RETURN rec.nombre AS Recomendado, count(*) AS Puntos
ORDER BY Puntos DESC
LIMIT 5;
```

### Restaurantes más cercanos a una ubicación (sin guardar lat/lon en Usuario)

```
WITH {lat} AS latUsuario, {lon} AS lonUsuario
MATCH (r:Restaurante)-[:UBICADO_EN]->(l:Ubicacion)
WITH r, l, 
     point({latitude: latUsuario, longitude: lonUsuario}) AS puntoUsuario,
     point({latitude: l.lat, longitude: l.lon}) AS puntoUbicacion
RETURN r.nombre AS Restaurante, point.distance(puntoUsuario, puntoUbicacion) AS Distancia
ORDER BY Distancia ASC
LIMIT 3;
```

### Información de ubicación de un restaurante

```
MATCH (r:Restaurante {nombre: { nombre del restaurante } })-[:UBICADO_EN]->(l:Ubicacion)
RETURN r.nombre AS Restaurante, l.nombre AS Edificio, l.lat AS Latitud, l.lon AS Longitud;
```

### Todas las ubicaciones de restaurantes

```
MATCH (r:Restaurante)-[:UBICADO_EN]->(l:Ubicacion)
RETURN r.nombre AS Restaurante, l.nombre AS Ubicacion;
```