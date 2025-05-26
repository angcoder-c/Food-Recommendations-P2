import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function POST(request: Request) {
    const session = driver.session()

    try {
        const body = await request.json()
        const { id } = body

        
        if (!id) {
            return NextResponse.json(
                { error: 'ERROR: se requiere id de un usuario' },
                { status: 400 }
            )
        }

        const similitudQuery = `
            MATCH (u1:Usuario {id: "${id}"})-[:LIKE]->(p:Producto)<-[:LIKE]-(u2:Usuario)
            WHERE u1 <> u2
            WITH u1, u2, COLLECT(p) AS commonProducts, COUNT(p) AS commonCount
            MATCH (u1)-[:LIKE]->(p1:Producto)
            WITH u1, u2, commonCount, COUNT(p1) AS u1Count
            MATCH (u2)-[:LIKE]->(p2:Producto)
            WITH u1, u2, commonCount, u1Count, COUNT(p2) AS u2Count
            WITH u1, u2, 
                 CASE WHEN u1Count + u2Count - commonCount = 0 THEN 0 
                 ELSE 1.0 * commonCount / (u1Count + u2Count - commonCount) END AS similaridad
            MERGE (u1)-[s:SIMILAR_A]->(u2)
            SET s.score = similaridad
        `
        await session.run(similitudQuery)

        const recomendacionQuery = `
            MATCH (targetUser:Usuario {id: "${id}"})-[s:SIMILAR_A]->(similarUser:Usuario)
            MATCH (similarUser)-[:LIKE]->(p:Producto)
            WHERE NOT EXISTS((targetUser)-[:LIKE]->(p))
            WITH p, SUM(s.score) AS score, COUNT(similarUser) AS userCount
            ORDER BY score DESC, userCount DESC
            LIMIT 5
            // obtener los detalles del producto
            OPTIONAL MATCH (p)<-[:OFRECE]-(r:Restaurante)
            OPTIONAL MATCH (u:Usuario)-[:LIKE]->(p)
            WITH p, r, score, userCount, COUNT(u) AS likeCount
            RETURN 
            p.nombre AS nombre,
            r.nombre AS restaurante,
            p.tipo AS tipo,
            p.precio AS precio,
            likeCount AS likes,
            p.img AS img
        `

        const result = await session.run(recomendacionQuery)

        const recomendaciones = result.records.map((record) => ({
            nombre: record.get('nombre'),
            tipo: record.get('tipo'),
            precio: record.get('precio'),
            img: record.get('img'),
            restaurante: record.get('restaurante'),
            likes: record.get('likes').toInt()
        }))

        return NextResponse.json({ recomendaciones })

    } catch (error) {
        console.error('ERROR: ', error)
        return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    } finally {
        await session.close()
    }
}
