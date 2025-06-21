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
  const [imageFile, setImageFile] = useState(null);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    let photoUrl = form.photo_profil;
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      const uploadRes = await fetch("/api/ajouter/upload", {
        method: "POST",
        body: formData
      });
      const uploadData = await uploadRes.json();
      if (uploadRes.ok) {
        photoUrl = uploadData.url;
      } else {
        setMessage("Erreur lors de l'upload de la photo");
        return;
      }
    }
    try {
      const res = await fetch("/api/ajouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, photo_profil: photoUrl })
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
      setImageFile(null);
      setStep(1);
    } catch {
      setMessage("Erreur lors de l'envoi");
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f7f7" }}>
      <div style={{ width: 420, background: "white", borderRadius: 16, boxShadow: "0 0 25px rgba(0,0,0,0.10)", padding: 40 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 24 }}>
          {[1, 2, 3].map(n => (
            <div
              key={n}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: step === n ? "#6c63ff" : "#e0e0e0",
                color: step === n ? "#fff" : "#888",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "1.2rem",
                boxShadow: step === n ? "0 2px 8px #6c63ff33" : "none",
                transition: "background 0.2s, color 0.2s"
              }}
            >
              {n}
            </div>
          ))}
        </div>
        <h2 style={{ textAlign: "center", marginBottom: 30, color: "#333" }}>Inscription Étudiant</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {step === 1 && (
            <>
              <input type="text" name="matricule" placeholder="Matricule" value={form.matricule} onChange={handleChange} required style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd" }} />
              <input type="text" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd" }} />
              <input type="text" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd" }} />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd" }} />
              <button type="button" onClick={handleNext} style={{ background: "#6c63ff", color: "white", border: "none", borderRadius: 5, padding: 12, fontWeight: "bold", fontSize: 16, cursor: "pointer" }}>
                Suivant
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <select name="sexe" value={form.sexe} onChange={handleChange} required style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd" }}>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
                <option value="O">Autre</option>
              </select>
              <input type="password" name="mot_de_passe" placeholder="Mot de passe" value={form.mot_de_passe} onChange={handleChange} required style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd" }} />
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd", background: "#fafafa" }} />
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" onClick={handleBack} style={{ flex: 1, background: "#e0e0e0", color: "#333", border: "none", borderRadius: 5, padding: 12, fontWeight: "bold", fontSize: 16, cursor: "pointer" }}>
                  Précédent
                </button>
                <button type="button" onClick={handleNext} style={{ flex: 1, background: "#6c63ff", color: "white", border: "none", borderRadius: 5, padding: 12, fontWeight: "bold", fontSize: 16, cursor: "pointer" }}>
                  Suivant
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <input type="date" name="date_naissance" placeholder="Date de naissance" value={form.date_naissance} onChange={handleChange} style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd" }} />
              <input type="number" name="niveau_etude" placeholder="Niveau d'étude" value={form.niveau_etude} onChange={handleChange} min="0" style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd" }} />
              <input type="text" name="filiere" placeholder="Filière" value={form.filiere} onChange={handleChange} style={{ padding: 10, borderRadius: 5, border: "1px solid #ddd" }} />
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" onClick={handleBack} style={{ flex: 1, background: "#e0e0e0", color: "#333", border: "none", borderRadius: 5, padding: 12, fontWeight: "bold", fontSize: 16, cursor: "pointer" }}>
                  Précédent
                </button>
                <button type="submit" style={{ flex: 1, background: "#FF9800", color: "white", border: "none", borderRadius: 5, padding: 12, fontWeight: "bold", fontSize: 16, cursor: "pointer" }}>
                  Ajouter l'étudiant
                </button>
              </div>
            </>
          )}
        </form>
        {message && <p style={{ marginTop: 20, color: message.includes("Erreur") ? "#d32f2f" : "#388e3c", textAlign: "center" }}>{message}</p>}
      </div>
    </main>
  );
}