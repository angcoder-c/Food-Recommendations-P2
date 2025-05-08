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
MERGE (pa:Producto {nombre: "ComidaA", tipo: "comida", precio: 80.0});
MERGE (pb:Producto {nombre: "ComidaB", tipo: "comida", precio: 95.0});
MERGE (pc:Producto {nombre: "ComidaC", tipo: "comida", precio: 75.0});
MERGE (pd:Producto {nombre: "ComidaD", tipo: "comida", precio: 110.0});

MATCH (r:Restaurante {nombre: "Restaurante1"})
MATCH (pa:Producto {nombre: "ComidaA"})
MATCH (pb:Producto {nombre: "ComidaB"})
MATCH (pc:Producto {nombre: "ComidaC"})
MATCH (pd:Producto {nombre: "ComidaD"})
MERGE (r)-[:OFRECE]->(pa)
MERGE (r)-[:OFRECE]->(pb)
MERGE (r)-[:OFRECE]->(pc)
MERGE (r)-[:OFRECE]->(pd);

// user 1: likes
MERGE (u1:Usuario {id: "usuario1", nombre: "user 1"})
WITH u1
MATCH (pa:Producto {nombre: "ComidaA"})
MATCH (pb:Producto {nombre: "ComidaB"})
MERGE (u1)-[:LIKE {fecha: datetime('2025-03-15')}]->(pa)
MERGE (u1)-[:LIKE {fecha: datetime('2025-03-20')}]->(pb);

// usuario 2: likes
MERGE (u2:Usuario {id: "usuario2", nombre: "user 2"})
WITH u2
MATCH (pa:Producto {nombre: "ComidaA"})
MATCH (pb:Producto {nombre: "ComidaB"})
MATCH (pc:Producto {nombre: "ComidaC"})
MERGE (u2)-[:LIKE {fecha: datetime('2025-03-12')}]->(pa)
MERGE (u2)-[:LIKE {fecha: datetime('2025-03-18')}]->(pb)
MERGE (u2)-[:LIKE {fecha: datetime('2025-04-02')}]->(pc);

// usuario 3: likes
MERGE (u3:Usuario {id: "usuario3", nombre: "user 3"})
WITH u3
MATCH (pa:Producto {nombre: "ComidaA"})
MATCH (pc:Producto {nombre: "ComidaC"})
MERGE (u3)-[:LIKE {fecha: datetime('2025-03-10')}]->(pa)
MERGE (u3)-[:LIKE {fecha: datetime('2025-03-22')}]->(pc);

// usuario 4: likes
MERGE (u4:Usuario {id: "usuario4", nombre: "user 4"})
WITH u4
MATCH (pb:Producto {nombre: "ComidaB"})
MATCH (pc:Producto {nombre: "ComidaC"})
MATCH (pd:Producto {nombre: "ComidaD"})
MERGE (u4)-[:LIKE {fecha: datetime('2025-03-15')}]->(pb)
MERGE (u4)-[:LIKE {fecha: datetime('2025-03-28')}]->(pc)
MERGE (u4)-[:LIKE {fecha: datetime('2025-04-05')}]->(pd);

// usuario 5: likes
MERGE (u5:Usuario {id: "usuario5", nombre: "user 5"})
WITH u5
MATCH (pa:Producto {nombre: "ComidaA"})
MATCH (pd:Producto {nombre: "ComidaD"})
MERGE (u5)-[:LIKE {fecha: datetime('2025-03-25')}]->(pa)
MERGE (u5)-[:LIKE {fecha: datetime('2025-04-01')}]->(pd);
```

![image](https://github.com/user-attachments/assets/2764faff-483f-4393-bceb-bcaa8221a85b)

