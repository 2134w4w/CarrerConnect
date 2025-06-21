'use client';
import { useState } from 'react';

export default function AjouterImagesProjet() {
  const [projetId, setProjetId] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('projet_id', projetId);
    for (let i = 0; i < images.length; i++) {
      data.append('photos', images[i]);
    }

    const res = await fetch('/api/ajouter-images', {
      method: 'POST',
      body: data
    });

    const result = await res.json();
    if (res.ok) {
      alert('Images ajoutées avec succès !');
      setProjetId('');
      setImages([]);
    } else {
      alert('Erreur : ' + result.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Ajouter des images à un projet</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="ID du projet"
          value={projetId}
          onChange={(e) => setProjetId(e.target.value)}
          required
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          accept="image/*"
          required
        />
        <button type="submit">Ajouter les images</button>
      </form>
    </div>
  );
}
