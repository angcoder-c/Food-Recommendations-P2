import { NextResponse } from "next/server";
import driver from "./../../../lib/neo4j";

export async function POST(request: Request) {
  const session = driver.session();

  try {
    const body = await request.json();
    const { usuarioId, productoNombre } = body;

    if (!usuarioId || !productoNombre) {
      return NextResponse.json(
        {
          error: "ERROR: se requiere un id de usuario y un nombre de producto",
        },
        { status: 400 }
      );
    }

<<<<<<< HEAD
        const checkQuery = `
=======
  const checkQuery = `
>>>>>>> b54c72b2a1442427245630b535d3f7f350e633a7
            MATCH (u:Usuario {id: "${usuarioId}"})
            MATCH (p:Producto {nombre: "${productoNombre}"})
            OPTIONAL MATCH (u)-[l:LIKE]->(p)
            RETURN l IS NOT NULL as hasLiked, p.likes as currentLikes
        `;

<<<<<<< HEAD
        const checkResult = await session.run(checkQuery)
        
        if (checkResult.records.length === 0) {
            return NextResponse.json(
                { error: 'Usuario o producto no encontrado' },
                { status: 404 }
            )
        }

        const hasLiked = checkResult.records[0].get('hasLiked')
        
        if (hasLiked) {
            return NextResponse.json(
                { error: 'El usuario ya dio like a este producto' },
                { status: 409 } // Conflict
            )
        }

        const likeQuery = `
            MATCH (u:Usuario {id: "${usuarioId}")
            MATCH (p:Producto {nombre: "${productoNombre}")
            MERGE (u)-[l:LIKE]->(p)
            SET l.fecha = datetime()
            SET p.likes = COALESCE(p.likes, 0) + 1
            RETURN p.likes as newLikes
        `;

        const likeResult = await session.run(likeQuery, { usuarioId, productoNombre })
        const newLikes = likeResult.records[0]?.get('newLikes') || 0

        return NextResponse.json({
            msg: `usuario '${usuarioId}' like a '${productoNombre}'`,
            newLikes: newLikes
        })
    } catch (error) {
        console.error('ERROR:', error);
        return NextResponse.json(
            { error: 'internal server error' },
            { status: 500 }
        )
    } finally {
        await session.close()
=======
    const checkResult = await session.run(checkQuery, {
      usuarioId,
      productoNombre,
    });

    if (checkResult.records.length === 0) {
      return NextResponse.json(
        { error: "Usuario o producto no encontrado" },
        { status: 404 }
      );
>>>>>>> b54c72b2a1442427245630b535d3f7f350e633a7
    }

    const hasLiked = checkResult.records[0].get("hasLiked");

    if (hasLiked) {
      return NextResponse.json(
        { error: "El usuario ya dio like a este producto" },
        { status: 409 }
      );
    }

    const likeQuery = `
    MATCH (u:Usuario {id: "${usuarioId}"})
    MATCH (p:Producto {nombre: "${productoNombre}"})
    MERGE (u)-[l:LIKE]->(p)
    SET l.fecha = datetime()
    SET p.likes = COALESCE(p.likes, 0) + 1
    RETURN p.likes as newLikes
`;
    const likeResult = await session.run(likeQuery, {
      usuarioId,
      productoNombre,
    });
    const newLikesNeo4j = likeResult.records[0]?.get("newLikes");
    const newLikes = newLikesNeo4j ? newLikesNeo4j.toInt() : 0;

    return NextResponse.json({
      msg: `usuario '${usuarioId}' like a '${productoNombre}'`,
      newLikes: newLikes,
    });
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}
