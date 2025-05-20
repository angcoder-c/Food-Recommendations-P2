import { NextResponse } from 'next/server';
import driver from './../../lib/neo4j';

export async function GET() {
    const session = driver.session();

    try {
        const result = await session.run('MATCH (n) RETURN n LIMIT 5');
        const nodes = result.records.map((record) => record.get('n').properties);
        return NextResponse.json({ nodes });
    } catch (error) {
        console.error('Neo4j error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await session.close();
    }
}
