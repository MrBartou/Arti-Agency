import { Component } from '@angular/core';
import { CommandesService } from '../../services/commandes.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  name: string;
  email: string;
  message: string;
  error: string;
  successMsg: string;

  constructor(private commandesService: CommandesService) {
    this.name = '';
    this.email = '';
    this.message = '';
    this.error = '';
    this.successMsg = '';
  }

  validate(e: Event) {
    e.preventDefault();

    if (this.name.length < 3) {
      this.error = 'Votre nom doit comporter au moins 3 caractères.';
      return false;
    }

    if (!(this.email.includes('.') && this.email.includes('@'))) {
      this.error = 'Veuillez entrer une adresse email valide.';
      return false;
    }

    if (!this.emailIsValid(this.email)) {
      this.error = 'Veuillez entrer une adresse email valide.';
      return false;
    }

    if (this.message.length < 15) {
      this.error = 'Veuillez écrire un message plus long.';
      return false;
    }

    this.error = '';

    this.successMsg = 'Merci! Je vous répondrai dès que possible.';

    const commande = {
      name: this.name,
      avatar: 'https://picsum.photos/200/300',
      message: this.message,
      date: new Date().toISOString().slice(0, 10),
    };

    this.commandesService.addCommande(commande)
      .then(() => {
        setTimeout(() => {
          this.successMsg = '';
          this.resetForm();
        }, 6000);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de la commande:', error);
        this.error = 'Une erreur s\'est produite lors de l\'envoi du formulaire. Veuillez réessayer.';
      });

    return true;
  }

  emailIsValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
