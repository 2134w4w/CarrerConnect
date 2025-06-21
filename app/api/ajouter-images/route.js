import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const projet_id = formData.get('projet_id');

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const photos = formData.getAll('photos');
    if (!photos.length) throw new Error('Aucune image reçue.');

    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '0000',
      database: 'BDCARRER'
    });

    for (const photo of photos) {
      if (!photo || typeof photo.arrayBuffer !== 'function') continue;

      const buffer = Buffer.from(await photo.arrayBuffer());
      const fileName = `${Date.now()}_${photo.name}`;
      const photoPath = `/uploads/${fileName}`;
      const fullPath = path.join(uploadDir, fileName);

      fs.writeFileSync(fullPath, buffer);

      await db.execute(
        `INSERT INTO photo_projet (projet_id, url_photo) VALUES (?, ?)`,
        [projet_id, photoPath]
      );
    }

    await db.end();

    return new Response(JSON.stringify({ message: 'Images ajoutées avec succès' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Erreur ajout images projet:", error);
    return new Response(JSON.stringify({
      message: 'Erreur ajout images',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
