import { NextResponse } from 'next/server';
import driver from './../../..//lib/neo4j';

export async function POST(request: Request) {
    const session = driver.session();

    try {
        const body = await request.json();
        const { restaurante, productos } = body;

        if (!restaurante || !Array.isArray(productos) || productos.length === 0) {
            return NextResponse.json(
                { error: 'ERROR: requiere un nombre de restaurante y una lista de productos' },
                { status: 400 }
            );
        }

        const tx = session.beginTransaction();

        for (const producto of productos) {
            const { nombre, tipo, precio, img } = producto;

            if (!nombre || !img || !tipo || typeof precio === 'number') {
                return NextResponse.json(
                    { error: 'ERROR: un producto debe tener nombre, img, tipo y precio' },
                    { status: 400 }
                );
            }

            const query = `
                MERGE (p:Producto {nombre: "${nombre}"})
                SET p.tipo = "${tipo}", p.precio = ${precio}, p.img = "${img}"
                WITH p
                MATCH (r:Restaurante {nombre: "${restaurante}"})
                MERGE (r)-[:OFRECE]->(p)
            `;

            await tx.run(query, { nombre, tipo, precio, restaurante });
        }

        await tx.commit();

        return NextResponse.json({
            msg: `productos agregados a '${restaurante}'`,
            count: productos.length,
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