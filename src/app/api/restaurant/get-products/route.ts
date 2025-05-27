import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function POST(request: Request) {
    const session = driver.session();

    try {
        const body = await request.json();
        const { nombre } = body;

        if (!nombre) {
            return NextResponse.json(
                { error: 'ERROR: se requiere nombre' },
                { status: 400 }
            );
        }

        const query = `
            MATCH (r:Restaurante {nombre: "${nombre}"})-[:OFRECE]->(p:Producto)
            RETURN p.nombre AS nombre, p.tipo AS tipo, p.precio AS precio, p.img AS img
        `;

        const result = await session.run(query, { nombre });

        const productos = result.records.map((record) => ({
            nombre: record.get('nombre'),
            tipo: record.get('tipo'),
            precio: record.get('precio'),
            img: record.get('img'),

        }));

        return NextResponse.json({ restaurante: nombre, productos });
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