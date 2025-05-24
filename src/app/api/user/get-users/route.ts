import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';

export async function GET() {
    const session = driver.session();

    try {
        const result = await session.run('MATCH (n:Usuario) RETURN n');
        const users = result.records.map((record) => record.get('n').properties);
        return NextResponse.json({ users });
    } catch (error) {
        console.error('DB ERROR:', error);
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
