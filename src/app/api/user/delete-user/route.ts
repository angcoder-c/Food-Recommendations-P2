import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function DELETE(request: Request) {
    const session = driver.session()

    try {
        const body = await request.json()
        const {id} = body

        if (!id) {
            return NextResponse.json(
                { 
                    error: 'ERROR: se requiere un id' 
                },
                { 
                    status: 400 
                }
            )
        }

        const query = `
            MATCH (u:Usuario {id: "${id}"})
            DETACH DELETE u
        `

        await session.run(query);

        return NextResponse.json({ 
            msg: `usuario '${id}' eliminado` 
        })
    } catch (error) {
        console.error('ERROR:', error);
        return NextResponse.json({ 
            error: 'internal server error' 
        }, 
        { 
            status: 500 
        })
    } finally {
        await session.close()
    }
}
