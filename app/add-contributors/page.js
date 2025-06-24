'use client';
import { useState } from 'react';
import "./ajoutercontrib.css"

export default function AjouterContributeur() {
  const [formData, setFormData] = useState({
    projet_id: '',
    etudiant_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/ajouter-contribution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await res.json();
    if (res.ok) {
      alert("Contributeur ajouté avec succès !");
      setFormData({ projet_id: '', etudiant_id: '' }); // reset form
    } else {
      alert("Erreur : " + result.message);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Ajouter un contributeur à un projet</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          name="projet_id"
          value={formData.projet_id}
          onChange={handleChange}
          placeholder="ID du projet"
          required
        />
        <input
          type="text"
          name="etudiant_id"
          value={formData.etudiant_id}
          onChange={handleChange}
          placeholder="Matricule de l'étudiant"
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
