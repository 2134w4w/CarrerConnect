import mysql from 'mysql2/promise';

export async function OPTIONS() {
  // Réponse CORS pour les pré-requêtes
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request) {
  try {
    const {
      matricule,
      nom,
      prenom,
      email,
      sexe,
      mot_de_passe,
      photo_profil,
      date_naissance,
      niveau_etude,
      filiere
    } = await request.json();
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '0000',
      database: 'BDCARRER',
      port: 3306
    });
    // Vérifier si l'email existe déjà
    const [rows] = await connection.execute('SELECT email FROM Etudiants WHERE email = ?', [email]);
    if (rows.length > 0) {
      await connection.end();
      return new Response(JSON.stringify({ message: "Cet email existe déjà." }), {
        status: 409,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }
    await connection.execute(
      `INSERT INTO Etudiants (matricule, nom, prenom, email, sexe, mot_de_passe, photo_profil, date_naissance, niveau_etude, filiere, date_creation, date_modification, dernier_login)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`, 
      [
        matricule,
        nom,
        prenom,
        email,
        sexe,
        mot_de_passe,
        photo_profil,
        date_naissance || null,
        niveau_etude,
        filiere
      ]
    );
    await connection.end();
    return new Response(JSON.stringify({ message: 'Étudiant enregistré avec succès !' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error) {
    console.error('Erreur API /api/ajouter:', error); // Ajout du log détaillé
    return new Response(JSON.stringify({ message: "Erreur lors de l'enregistrement", error: error.message, stack: error.stack }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
