import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function DELETE(request: Request) {
    const session = driver.session();

    try {
        const body = await request.json();
        const {nombre} = body;

        if (!nombre) {
            return NextResponse.json(
                { 
                    error: 'ERROR: se requiere un nombre' 
                },
                { 
                    status: 400 
                }
            );
        }

        const query = `
            MATCH (r:Restaurante {nombre: "${nombre}"})-[:OFRECE]->(p:Producto)
            DETACH DELETE p
            MATCH (r:Restaurante {nombre: "${nombre}"})
            DETACH DELETE r
        `;

        await session.run(query);

        return NextResponse.json({ 
            msg: `restaurante '${nombre}' eliminado` 
        });
    } catch (error) {
        console.error('ERROR:', error);
        return NextResponse.json({ 
            error: 'internal server error' 
        }, 
        { 
            status: 500 
        });
    } finally {
        await session.close();
    }
}
