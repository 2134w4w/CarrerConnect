import mysql from 'mysql2/promise';

// API de connexion pour les étudiants
export async function POST(request) {
  try {
    const { matricule, motDePasse } = await request.json();
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '0000',
      database: 'BDCARRER',
      port: 3306
    });
    // On cherche l'étudiant avec ce matricule
    const [rows] = await connection.execute(
      'SELECT * FROM Etudiants WHERE matricule = ?',
      [matricule]
    );
    let etudiant = rows[0];
    if (rows.length === 0 || etudiant.mot_de_passe !== motDePasse) {
      await connection.end();
      return Response.json({ message: 'Les informations de connexion sont incorrectes.' }, { status: 401 });
    }
    // Connexion réussie
    await connection.end();
    return Response.json({ message: 'Connexion réussie !', etudiant: { matricule: etudiant.matricule, nom: etudiant.nom, prenom: etudiant.prenom, email: etudiant.email } }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Erreur serveur", error: error.message }, { status: 500 });
  }
}
