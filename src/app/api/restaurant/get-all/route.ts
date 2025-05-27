import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function GET() {
    const session = driver.session();

    try {
        const query = `
            MATCH (r:Restaurante)
            RETURN r.nombre AS nombre
        `;

        const result = await session.run(query);

        const restaurantes = result.records.map((record) => record.get('nombre'));

        return NextResponse.json(restaurantes);
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