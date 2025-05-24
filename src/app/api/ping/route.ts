import { NextResponse } from 'next/server';
import driver from '../../lib/neo4j';

export async function GET() {
    const session = driver.session();

    try {
        return NextResponse.json({ msg : 'pong' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await session.close();
    }
}
