import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]') as HTMLInputElement;
  name = document.getElementById('name') as HTMLInputElement;
  email = document.getElementById('email') as HTMLInputElement;
  message = document.getElementById('message') as HTMLInputElement;
  contactForm = document.getElementById('contact-form') as HTMLFormElement;
  errorElement = document.getElementById('error') as HTMLElement;
  successMsg = document.getElementById('success-msg') as HTMLElement;
  submitBtn = document.getElementById('submit') as HTMLButtonElement;

  validate(e: Event) {
    e.preventDefault();

    if (this.name.value.length < 3) {
      if (this.errorElement) {
        this.errorElement.innerHTML = 'Votre nom doit comporter au moins 3 caractères.';
      }
      return false;
    }

    if (!(this.email.value.includes('.') && this.email.value.includes('@'))) {
      if (this.errorElement) {
        this.errorElement.innerHTML = 'Veuillez entrer une adresse email valide.';
      }
      return false;
    }

    if (!this.emailIsValid(this.email.value)) {
      if (this.errorElement) {
        this.errorElement.innerHTML = 'Veuillez entrer une adresse email valide.';
      }
      return false;
    }

    if (this.message.value.length < 15) {
      if (this.errorElement) {
        this.errorElement.innerHTML = 'Veuillez écrire un message plus long.';
      }
      return false;
    }

    if (this.errorElement) {
      this.errorElement.innerHTML = '';
    }

    if (this.successMsg) {
      this.successMsg.innerHTML = 'Merci! Je vous répondrai dès que possible.';
    }

    setTimeout(() => {
      if (this.successMsg) {
        this.successMsg.innerHTML = '';
        this.contactForm.reset();
      }
    }, 6000);

    return true;
  }

  emailIsValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
