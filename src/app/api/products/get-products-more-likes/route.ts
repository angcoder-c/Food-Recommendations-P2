import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function GET() {
    const session = driver.session();

    try {
        const query = `
            MATCH (u:Usuario)-[:LIKE]->(p:Producto)
            RETURN p.nombre AS nombre, p.tipo AS tipo, p.precio AS precio, COUNT(u) AS likes
            ORDER BY likes DESC
        `;

        const result = await session.run(query);

        const productos = result.records.map((record) => ({
            nombre: record.get('nombre'),
            tipo: record.get('tipo'),
            precio: record.get('precio'),
            likes: record.get('likes').toInt(),
        }));

        return NextResponse.json({ productos });
    } catch (error) {
        console.error('ERROR:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    } finally {
        await session.close();
    }
}