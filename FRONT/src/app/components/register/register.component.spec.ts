import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  onRegister() {
    // Logique d'inscription ici
    if (this.name && this.email && this.password) {
      // Supposons que l'inscription réussisse
      this.successMessage = 'Inscription réussie !';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
      this.successMessage = '';
    }
  }
}
