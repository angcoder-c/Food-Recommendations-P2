import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function POST(request: Request) {
    const session = driver.session();

    try {
        const body = await request.json();
        const { nombre, ubicacion } = body;

        if (!nombre || !ubicacion) {
            return NextResponse.json(
                { 
                    error: 'ERROR: faltan campos' 
                },
                { 
                    status: 400 
                }
            );
        }

        const query = `
            MERGE (r:Restaurante {nombre: "${nombre}"})
            WITH r
            MATCH (u:Ubicacion {nombre: "${ubicacion}"})
            MERGE (r)-[:LOCATED_AT]->(u)
        `;

        await session.run(query);

        return NextResponse.json({ msg: `restaurante '${nombre}' registrado en '${ubicacion}'` });
    } catch (error) {
        console.error('ERROR:', error);
        return NextResponse.json({ 
            msg: 'internal server error' 
        }, 
        { 
            status: 500 
        });
    } finally {
        await session.close();
    }
}