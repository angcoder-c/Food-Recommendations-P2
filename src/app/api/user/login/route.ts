import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const session = driver.session();

  try {
    const { id, password } = await request.json();

    if (!id || !password) {
      return NextResponse.json(
        { error: 'ERROR: se requiere id y password' },
        { status: 400 }
      );
    }

    const result = await session.run(
      `
      MATCH (u:Usuario {id: "${id}", password: "${password}"})
      RETURN u.nombre AS nombre
      `,
    );

    if (result.records.length === 0) {
      return NextResponse.json({ error: 'credenciales invalidas' }, { status: 401 });
    }

    const hash = result.records[0].get('hash');
    const nombre = result.records[0].get('nombre');

    const valid = await bcrypt.compare(password, hash);

    if (!valid) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    return NextResponse.json({ msg: 'login succesfully exitoso', nombre });
  } catch (error) {
    console.error('ERROR login:', error);
    return NextResponse.json({ error: 'internal server error' }, { status: 500 });
  } finally {
    await session.close();
  }
}
