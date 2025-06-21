import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const nom = formData.get('nom');
    const description = formData.get('description');
    const encadreur = formData.get('encadreur');
    const photoFile = formData.get('photo');

    let photoPath = '';

    if (photoFile && typeof photoFile.arrayBuffer === 'function') {
      const buffer = Buffer.from(await photoFile.arrayBuffer());

      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}_${photoFile.name}`;
      photoPath = `/uploads/${fileName}`;
      const fullPath = path.join(uploadDir, fileName);
      fs.writeFileSync(fullPath, buffer);
    }

    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '0000',
      database: 'BDCARRER',
    });

    await db.execute(
      `INSERT INTO projet (nom_projet, description, encadreur, logo_projet, date_soumission)
       VALUES (?, ?, ?, ?, NOW())`,
      [nom, description, encadreur, photoPath]
    );

    await db.end();

    return new Response(JSON.stringify({ message: "Projet ajouté avec succès" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Erreur serveur:", error);  // 👈 ce log est crucial
    return new Response(JSON.stringify({
      message: "Erreur lors de l'ajout du projet",
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
}
}
