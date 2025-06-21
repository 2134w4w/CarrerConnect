import mysql from 'mysql2/promise';

export async function POST(request) {
  try {
    const { projet_id, etudiant_id } = await request.json();

    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '0000',
      database: 'BDCARRER',
    });

    await db.execute(
      `INSERT INTO contribution_projet (projet_id, etudiant_id)
       VALUES (?, ?)`,
      [projet_id, etudiant_id]
    );

    await db.end();

    return new Response(JSON.stringify({ message: 'Contributeur ajouté avec succès' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur ajout contributeur:', error);
    return new Response(JSON.stringify({ message: "Erreur", error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
