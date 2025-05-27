import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function POST(request: Request) {
    const session = driver.session()

    try {
        const body = await request.json()
        const { usuarioId, productoNombre } = body

        if (!usuarioId || !productoNombre) {
            return NextResponse.json(
                { error: 'ERROR: se requiere un id de usuario y un nombre de producto' },
                { status: 400 }
            )
        }

        const query = `
            MATCH (u:Usuario {id: $usuarioId})
            MATCH (p:Producto {nombre: $productoNombre})
            OPTIONAL MATCH (u)-[l:LIKE]->(p)
            RETURN l IS NOT NULL as hasLiked
        `;

        const result = await session.run(query, { usuarioId, productoNombre })
        
        if (result.records.length === 0) {
            return NextResponse.json(
                { error: 'Usuario o producto no encontrado' },
                { status: 404 }
            )
        }

        const hasLiked = result.records[0].get('hasLiked')

        return NextResponse.json({
            hasLiked: hasLiked,
            usuarioId,
            productoNombre
        })
    } catch (error) {
        console.error('ERROR checking like status:', error);
        return NextResponse.json(
            { error: 'internal server error' },
            { status: 500 }
        )
    } finally {
        await session.close()
    }
}