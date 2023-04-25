import { Component } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // Variables pour stocker les données de connexion
  username: string;
  password: string;

  constructor() {
    // Initialiser les variables
    this.username = '';
    this.password = '';
  }

  // Fonction pour gérer la soumission du formulaire
  onSubmit(): void {
    // Effectuer la logique de connexion ici
    console.log("Nom d'utilisateur:", this.username);
    console.log('Mot de passe:', this.password);
    // Remplacez cette logique avec votre propre logique de connexion
  }
}
