import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function GET() {
    const session = driver.session();

    try {
        const query = `
            MATCH (u:Usuario)-[:LIKE]->(p:Producto)<-[:OFRECE]-(r:Restaurante)
            RETURN p.nombre AS nombre,
                r.nombre AS restaurante,
                p.tipo AS tipo,
                p.precio AS precio,
                p.img AS img,
                COUNT(u) AS likes
            ORDER BY likes DESC
        `;

        const result = await session.run(query);

        const productos = result.records.map((record) => ({
            nombre: record.get('nombre'),
            tipo: record.get('tipo'),
            precio: record.get('precio'),
            img: record.get('img'),
            restaurante: record.get('restaurante'),
            likes: record.get('likes').toInt(),
        }));

        return NextResponse.json({ productos });
    } catch (error) {
        console.error('ERROR:', error);
        return NextResponse.json(
            { error: 'internal server error' },
            { status: 500 }
        );
    } finally {
        await session.close();
    }
}