import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Accueil</h1>
      <ul>
        <li>
          <Link href="/creer-compte">Créer un compte</Link>
        </li>
        <li>
          <Link href="/CreerProjet">Créer un projet</Link>
        </li>
        <li>
          <Link href="/connexion-compte">Se connecter</Link>
        </li>
        <li>
          <Link href="/page-etudiant">Page Étudiant</Link>
        </li>
      </ul>
    </div>
  );
}