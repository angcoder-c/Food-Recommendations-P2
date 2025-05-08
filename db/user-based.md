# Querys

**Recomendacion**

```
MATCH (targetUser:Usuario {id: "usuario1"})-[s:SIMILAR_A]->(similarUser:Usuario)
MATCH (similarUser)-[:LIKE]->(p:Producto)
// productos aún no likeados
WHERE NOT EXISTS((targetUser)-[:LIKE]->(p))
// suma el peso de la similaridad de los usuarios similares
WITH p, SUM(s.score) AS score, COUNT(similarUser) AS userCount
ORDER BY score DESC, userCount DESC
LIMIT 5
RETURN p.nombre AS producto_recomendado, 
       score AS puntuacion_recomendacion,
       userCount AS cantidad_usuarios;
```

**Similitud entre usuarios basada en likes**

```
MATCH (u1:Usuario {id: "usuario1"})-[:LIKE]->(p:Producto)<-[:LIKE]-(u2:Usuario)
WHERE u1 <> u2
// interseccion: productos comunes
WITH u1, u2, 
     COLLECT(p) AS commonProducts,
     COUNT(p) AS commonCount
// total de productos usuario target
MATCH (u1)-[:LIKE]->(p1:Producto)
WITH u1, u2, commonCount, COUNT(p1) AS u1Count
// total de productos usuario similar
MATCH (u2)-[:LIKE]->(p2:Producto)
WITH u1, u2, commonCount, u1Count, COUNT(p2) AS u2Count
// union de productos de usuario target y similar
WITH u1, u2, 
     CASE WHEN u1Count + u2Count - commonCount = 0 THEN 0 // si la unión es 0, similaridad=0
     ELSE 1.0 * commonCount / (u1Count + u2Count - commonCount) END AS similaridad
// arista con peso
MERGE (u1)-[s:SIMILAR_A {score: similaridad}]->(u2)
RETURN u1.id, u2.id, similaridad
ORDER BY similaridad DESC;
```

# Diagramas

![image](https://github.com/user-attachments/assets/059e3146-f5db-4078-a9b4-d807f8036f2d)

![image](https://github.com/user-attachments/assets/dc762575-40ff-4b4d-b69a-ed0c48ace0d1)

![image](https://github.com/user-attachments/assets/8776f312-a9af-489b-ba2d-89abbe890c9f)
