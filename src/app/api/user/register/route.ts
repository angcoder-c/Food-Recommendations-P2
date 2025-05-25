import { NextResponse } from 'next/server';
import driver from '../../../lib/neo4j';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'fruvgjwtpass';

export async function POST(request: Request) {
  const session = driver.session();

  try {
    const { nombre, password } = await request.json();
    const id = Math.floor(Date.now() / 1000)

    if (!id || !nombre || !password) {
      return NextResponse.json(
        { error: 'ERROR: se requiere id, nombre y password' },
        { status: 400 }
      );
    }

    const check = await session.run(
      `
      MATCH (u:Usuario {nombre: "${nombre}"})
      RETURN u LIMIT 1
      `
    );

    if (check.records.length > 0) {
      return NextResponse.json(
        { error: 'username ya registrado' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //  nuevo usuario
    await session.run(
      `
      CREATE (u:Usuario {
        id: "${id}",
        nombre: "${nombre}",
        password: "${hashedPassword}"
      })
      RETURN u
      `
    );

    const token = jwt.sign({ id, nombre }, SECRET, { expiresIn: '7d' });

    return NextResponse.json(
      { 
        msg: 'usuario registrado', 
        token 
      });
  } catch (error) {
    console.error('ERROR registro:', error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}