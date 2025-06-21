'use client';
import { useState } from "react";

export default function CreerProjet() {
  const [formData, setFormData] = useState({
    description: "",
    nom: "",
    encadreur: "",
    photo: null
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nom", formData.nom);
    data.append("description", formData.description);
    data.append("encadreur", formData.encadreur);
    data.append("photo", formData.photo);

    const res = await fetch("/api/creerprojet", {
      method: "POST",
      body: data
    });

    const result = await res.json();
    if (res.ok) {
      alert("Projet ajouté avec succès !");
    } else {
      alert("Erreur: " + result.message);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="description"
          placeholder="Description du projet"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nom"
          placeholder="Nom du projet"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="encadreur"
          placeholder="Encadreur"
          value={formData.encadreur}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          required
        />
        <button type="submit">Créer le projet</button>
      </form>
    </main>
  );
}
