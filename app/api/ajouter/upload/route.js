import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  if (!file) {
    return NextResponse.json({ message: 'Aucun fichier reçu.' }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || '.jpg';
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
  const uploadDir = path.join(process.cwd(), 'server-img', 'picture-img');
  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, buffer);
  // Générer l'URL d'accès à l'image (à adapter selon le déploiement)
  const url = `/server-img/picture-img/${fileName}`;
  return NextResponse.json({ url });
}
