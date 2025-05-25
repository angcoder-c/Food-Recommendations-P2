import { NextResponse } from 'next/server';
import driver from './../../../lib/neo4j';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'fruvgjwtpass';

export async function POST(request: Request) {
  const session = driver.session()

  try {
    const { nombre, password } = await request.json()

    if (!nombre || !password) {
      return NextResponse.json(
        { error: 'ERROR: se requiere id y password' },
        { status: 400 }
      )
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await session.run(
      `
      MATCH (u:Usuario {nombre: "${nombre}"})
      RETURN u.password AS hash, u.id AS id, u.nombre AS nombre
      `,
    )

    if (result.records.length === 0) {
      return NextResponse.json(
        { error: 'credenciales invalidas' }, 
        { status: 401 }
      )
    }

    const hash = result.records[0].get('hash')
    const id = result.records[0].get('id')

    const valid = await bcrypt.compare(password, hash)

    if (!valid) {
      return NextResponse.json(
        { error: 'incorrect password' }, 
        { status: 401 }
      )
    }
    const token = jwt.sign({ id }, SECRET, { expiresIn: '7d' });
    return NextResponse.json({ 
      msg: 'login succesfully exitoso', 
      id,
      nombre,
      token 
    });
  } catch (error) {
    console.error('ERROR login:', error)
    return NextResponse.json(
      { error: 'internal server error' }, 
      { status: 500 }
    )
  } finally {
    await session.close()
  }
}
