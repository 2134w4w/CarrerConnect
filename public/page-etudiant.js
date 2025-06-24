"use client";

document.addEventListener("DOMContentLoaded", function() {
    const etudiant = JSON.parse(localStorage.getItem("etudiant"));
    if (etudiant) {
        document.getElementById("nom").textContent = etudiant.nom;
        document.getElementById("email").textContent = etudiant.email;
        document.getElementById("formation").textContent = etudiant.formation;
    }
});
    a = document.createElement('button');
    a.id = "logout";
    a.textContent = "Se déconnecter";
    document.body.appendChild(a);
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("etudiant");
        window.location.href = "./connexion-compte/page.html";
    });