import { NextResponse } from 'next/server';
import driver from '../../../lib/neo4j';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const session = driver.session();

  try {
    const { id, nombre, password } = await request.json();

    if (!id || !nombre || !password) {
      return NextResponse.json(
        { error: 'ERROR: se requiere id, nombre y password' },
        { status: 400 }
      );
    }

    const check = await session.run(
        `MATCH (u:Usuario {nombre: "${id}"}) RETURN u LIMIT 1`
    );

    if (check.records.length > 0) {
      return NextResponse.json(
        { error: 'el usuario ya está registrado' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await session.run(
      `
      CREATE (u:Usuario {id: "${id}", nombre: "${nombre}", password: "${hashedPassword}"})
      RETURN u
      `
    );

    return NextResponse.json({ msg: 'usuario registrado' });
  } catch (error) {
    console.error('ERROR registro:', error);
    return NextResponse.json({ error: 'internal server error' }, { status: 500 });
  } finally {
    await session.close();
  }
}