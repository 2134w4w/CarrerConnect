"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    email: "",
    sexe: "M",
    mot_de_passe: "",
    photo_profil: "",
    date_naissance: "",
    niveau_etude: 0,
    filiere: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/ajouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message);
      setForm({
        matricule: "",
        nom: "",
        prenom: "",
        email: "",
        sexe: "M",
        mot_de_passe: "",
        photo_profil: "",
        date_naissance: "",
        niveau_etude: 0,
        filiere: ""
      });
    } catch {
      setMessage("Erreur lors de l'envoi");
    }
  };

  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50 }}>
      <h2>Inscription Étudiant</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10, width: 350 }}>
        <label>Matricule :</label>
        <input type="text" name="matricule" value={form.matricule} onChange={handleChange} required />
        <label>Nom :</label>
        <input type="text" name="nom" value={form.nom} onChange={handleChange} required />
        <label>Prénom :</label>
        <input type="text" name="prenom" value={form.prenom} onChange={handleChange} required />
        <label>Email :</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Sexe :</label>
        <select name="sexe" value={form.sexe} onChange={handleChange} required>
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
          <option value="O">Autre</option>
        </select>
        <label>Mot de passe :</label>
        <input type="password" name="mot_de_passe" value={form.mot_de_passe} onChange={handleChange} required />
        <label>Photo de profil (URL) :</label>
        <input type="text" name="photo_profil" value={form.photo_profil} onChange={handleChange} />
        <label>Date de naissance :</label>
        <input type="date" name="date_naissance" value={form.date_naissance} onChange={handleChange} />
        <label>Niveau d'étude :</label>
        <input type="number" name="niveau_etude" value={form.niveau_etude} onChange={handleChange} min="0" />
        <label>Filière :</label>
        <input type="text" name="filiere" value={form.filiere} onChange={handleChange} />
        <button type="submit">Ajouter l'étudiant</button>
      </form>
      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </main>
  );
}
