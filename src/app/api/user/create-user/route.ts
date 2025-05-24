import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function POST(request: Request) {
    const session = driver.session();

    try {
        const body = await request.json();
        const { id, username, password } = body;

        if (!id || !username || !password) {
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
            MERGE (u:Usuario {id: "${id}"})
            SET u.nombre = "${username}", u.password = "${password}"
        `;

        await session.run(query);

        return NextResponse.json({ 
            msg: 'usuario creado exitosamente' 
        });

    } catch (error) {
        console.error('ERROR: ', error);

        return NextResponse.json({ 
                error: 'internal server error' 
            },
            { 
                status: 500 
            }
        );
    } finally {
        await session.close();
    }
}
