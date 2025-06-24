"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConnexionEtudiant() {
  const [matricule, setMatricule] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // Ici, vous pouvez ajouter la logique d'authentification réelle
    if (!matricule || !motDePasse) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }
    // Exemple de requête API (à adapter selon votre backend)
    try {
      const res = await fetch("/api/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matricule, motDePasse })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("etudiant", JSON.stringify(data.etudiant));
        setMessage("Connexion réussie !");
        setTimeout(() => {
          router.push("/page-etudiant.html");
        }, 1000);
      } else {
        setMessage(data.message || "Erreur de connexion.");
      }
    } catch {
      setMessage("Erreur lors de la connexion.");
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
      <div style={{ width: 400, background: "white", borderRadius: 12, boxShadow: "0 0 25px rgba(0,0,0,0.25)", padding: 40, textAlign: "center" }}>
        <h1 style={{ marginBottom: 30, color: "#333" }}>Connexion Étudiant</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <input
            type="text"
            placeholder="Matricule"
            value={matricule}
            onChange={e => setMatricule(e.target.value)}
            style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd" }}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)}
            style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd" }}
            required
          />
          <button type="submit" style={{ background: "#FF9800", color: "white", border: "none", borderRadius: 5, padding: 12, fontWeight: "bold", fontSize: 16, cursor: "pointer" }}>
            Se connecter
          </button>
        </form>
        {message && <p style={{ marginTop: 20, color: "#d32f2f" }}>{message}</p>}
        <a href="#" style={{ display: "block", marginTop: 20, color: "#2575fc" }}>Mot de passe oublié ?</a>
      </div>
    </main>
  );
}
