import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function POST(request: Request) {
    const session = driver.session();

    try {
        const body = await request.json();
        const { usuarioId, productoNombre } = body;

        if (!usuarioId || !productoNombre) {
            return NextResponse.json(
                { error: 'ERROR: se requiere un id de usuario y un nombre de producto' },
                { status: 400 }
            );
        }

        const query = `
            MATCH (u:Usuario {id: "${usuarioId}"})
            MATCH (p:Producto {nombre: "${productoNombre}"})
            MERGE (u)-[l:LIKE]->(p)
            SET l.fecha = datetime()
        `;

        await session.run(query, { usuarioId, productoNombre });

        return NextResponse.json({
            msg: `usuario '${usuarioId}' like a '${productoNombre}'`
        });
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